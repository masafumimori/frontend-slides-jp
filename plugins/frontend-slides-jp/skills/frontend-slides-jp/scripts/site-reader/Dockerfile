# Isolated site reader for extract-site.mjs: Chromium and Playwright, no access to the host's
# files, and egress limited to public addresses by entrypoint.sh. Built by ../read-site.sh.
FROM mcr.microsoft.com/playwright:v1.48.2-jammy
RUN apt-get update && apt-get install -y --no-install-recommends iptables util-linux \
 && apt-get clean \
 && mkdir -p /opt/pw && cd /opt/pw && npm init -y >/dev/null && npm i --no-audit --no-fund playwright@1.48.2
COPY entrypoint.sh /entrypoint.sh
ENV PLAYWRIGHT_MODULE=/opt/pw/node_modules/playwright/index.mjs
ENTRYPOINT ["/bin/bash", "/entrypoint.sh"]
