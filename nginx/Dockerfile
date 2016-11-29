FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf
RUN rm -f /etc/nginx/conf.d/default.conf
RUN mkdir -p /home/ec2-user/pheno-com-prod/html
