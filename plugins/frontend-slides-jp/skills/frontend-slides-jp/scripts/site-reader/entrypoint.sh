#!/usr/bin/env bash
# Runs as root only to set the egress rules, then drops to pwuser with no capabilities.
# Outbound traffic may reach the container's DNS resolver and public addresses; loopback
# services, private ranges, link-local (cloud metadata), CGNAT and all IPv6 are refused.
set -euo pipefail
dns=$(awk '/^nameserver/ {print $2; exit}' /etc/resolv.conf)
iptables -A OUTPUT -o lo -j ACCEPT
iptables -A OUTPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
if [[ -n "$dns" ]]; then
  iptables -A OUTPUT -d "$dns" -p udp --dport 53 -j ACCEPT
  iptables -A OUTPUT -d "$dns" -p tcp --dport 53 -j ACCEPT
fi
for net in 0.0.0.0/8 10.0.0.0/8 100.64.0.0/10 127.0.0.0/8 169.254.0.0/16 172.16.0.0/12 192.0.0.0/24 \
           192.168.0.0/16 198.18.0.0/15 224.0.0.0/4 240.0.0.0/4; do
  iptables -A OUTPUT -d "$net" -j REJECT
done
iptables -A OUTPUT -j ACCEPT
ip6tables -A OUTPUT -o lo -j ACCEPT 2>/dev/null || true
ip6tables -A OUTPUT -j REJECT 2>/dev/null || true
exec setpriv --reuid=pwuser --regid=pwuser --init-groups --inh-caps=-all --bounding-set=-all \
  env HOME=/home/pwuser node /app/extract-site.mjs "$@"
