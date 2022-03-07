FROM wuxue107/screenshot-api-base:1.1.0

WORKDIR /app

ENV TZ="Asia/Shanghai"
ENV NODE_ENV production

COPY . .

# 安装字体
COPY fonts/ /usr/share/fonts/

RUN npm install --registry=https://registry.npm.taobao.org

# 应该在这个阶段构建的，但是不知道为啥一直报midway-bin找不到，只能先在本地构建，然后把dist同步了
# RUN npm run build

EXPOSE 7001

VOLUME /app/public
VOLUME /root/logs/my-midway-project

CMD ["npm", "run", "online"]