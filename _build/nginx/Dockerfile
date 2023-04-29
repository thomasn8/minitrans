FROM nginx

COPY local.conf /etc/nginx/conf.d/default.conf
# COPY mail.conf /etc/nginx/mail.conf
COPY start.sh /

CMD ["sh", "/start.sh"]