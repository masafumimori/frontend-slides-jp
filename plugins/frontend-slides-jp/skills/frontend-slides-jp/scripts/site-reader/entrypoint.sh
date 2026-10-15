#!/usr/bin/env bash
# Runs as root only to set the egress rules, then drops to pwuser with no capabilities.
# Fails closed: the default is to drop, and the reader starts only after every rule is checked.
# Outbound traffic may reach the container's DNS resolver and public IPv4 addresses; loopback
# services, private ranges, link-local (cloud metadata), CGNAT, test and reserved ranges and
# all IPv6 are refused.
set -euo pipefail
fail() { echo "site-reader: $*; refusing to start" >&2; exit 1; }

BLOCKED="0.0.0.0/8 10.0.0.0/8 100.64.0.0/10 127.0.0.0/8 169.254.0.0/16 172.16.0.0/12 192.0.0.0/24 \
192.0.2.0/24 192.88.99.0/24 192.168.0.0/16 198.18.0.0/15 198.51.100.0/24 203.0.113.0/24 224.0.0.0/4 240.0.0.0/4"
dns=$(awk '/^nameserver/ {print $2; exit}' /etc/resolv.conf)
[[ "$dns" =~ ^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$ ]] || fail "no IPv4 DNS resolver in /etc/resolv.conf"

iptables -P OUTPUT DROP
iptables -A OUTPUT -o lo -j ACCEPT
iptables -A OUTPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
iptables -A OUTPUT -d "$dns" -p udp --dport 53 -j ACCEPT
iptables -A OUTPUT -d "$dns" -p tcp --dport 53 -j ACCEPT
for net in $BLOCKED; do iptables -A OUTPUT -d "$net" -j REJECT; done
iptables -A OUTPUT -j ACCEPT

# IPv6: read-site.sh disables it in the kernel; drop it here as well, and refuse to start if
# the container still has an IPv6 address other than loopback.
ip6tables -P OUTPUT DROP 2>/dev/null || true
ip6tables -A OUTPUT -o lo -j ACCEPT 2>/dev/null || true
if [[ "$(cat /proc/sys/net/ipv6/conf/all/disable_ipv6 2>/dev/null || echo 0)" != 1 ]]; then
  ip6tables -C OUTPUT -o lo -j ACCEPT >/dev/null 2>&1 || fail "IPv6 is enabled and ip6tables is unavailable"
  [[ "$(ip6tables -S OUTPUT | head -1)" == "-P OUTPUT DROP" ]] || fail "IPv6 egress is not set to drop"
fi

# Check the IPv4 rules before handing over.
[[ "$(iptables -S OUTPUT | head -1)" == "-P OUTPUT DROP" ]] || fail "IPv4 egress is not set to drop"
for net in $BLOCKED; do iptables -C OUTPUT -d "$net" -j REJECT >/dev/null 2>&1 || fail "missing rule for $net"; done

exec setpriv --reuid=pwuser --regid=pwuser --init-groups --inh-caps=-all --bounding-set=-all \
  env HOME=/home/pwuser node /app/extract-site.mjs "$@"
