pwd

```
systemsctl enable docker
```



# 镜像

## 添加镜像

### docker pull

```
docker pull centos tag:xx
```

### Dockerfile

```dockerfile
FROM node:16-alpine as builder

WORKDIR /WWW/WWWROOT/

ADD package.json /WWW/WWWROOT/
RUN npm i --registry https://registry.npm.taobao.org

ADD . /WWW/WWWROOT/

RUN npm run build

FROM nginx:alpine

COPY --from=builder WWW/WWWROOT/dist/ /usr/share/nginx/html/
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf


# 构建指令
# docker build -f Dockerfile.prod -t vue3 .

# 启动容器
# docker run -p 4000:80 -it --name web vue3
```

## 删除镜像

```
删除一个容器：
docker rmi -f id

删除全部容器：
docker rmi -f $(docker images -aq)
docker rmi `docker images -aq`
```

docker start id

docker attach id 进入容器

docker run -d 在后台启动

## 查找镜像

docker search --filter=start=30 xx



# 容器

## 跑一个容器

```
docker run --name web -it images //-it交互模式进入容器
docker run -id --name xx 镜像名字   //后台启动
```

进入项目的dist目录，$(pwd)会映射出当前项目的目录（linux）

```
docker run --name web-server -d -p 8000:80 -v $(pwd):/usr/share/nginx/html nginx
```

## 查看容器

```
docker ps     //查看当前运行的容器
docker ps -a  //查看所有容器
```

## 退出容器

```
exit       //直接退出则停止运行
ctrl+p+q   //退出保持运行
```

## 删除容器

```
docker rmi images  删除镜像
docker rm  id      删除容器
```

强制删除 -f

## 端口映射

```
docker run -d --name web-nginx -p 3344:80 nginx 
```

## 启动和停止容器

```
docker start id
docker restart id
docker stop id
docker kill id 停止当前正在运行的容器
```



## 进入正在运行的容器

```
docker exec -it id /bin/bash（必须） 【会开启新的终端】
docker attach id				    【显示当前运行中的终端】
```



## 创建文件

```
touch docker.js
```

## 把docker容器里面的文件拷贝到当前的centos中

```
docker cp -r id:/home/home.js /root
```

## 部署nginx

-p 端口映射 主机端口:容器端口

```
docker run -d --name web-nginx -p 3344:80 nginx 
```

## 容器数据卷

```
docker run -it -v 主机目录：容器目录 centos
docker run -it -v /home/ssr:/home centos
docker run -it -v C:\Users\15638\Desktop\vue3:/vue centos
docker run -it --name pwd -v ${pwd}:/vue centos [--privileged=true]
```

```
只读写 :ro :wo
docker run -it -v C:\Users\15638\Desktop\vue3:/vue:ro centos
```

```
docker inspect id //查看挂载是否成功
```

### 数据卷继承

```
--volumes-from vue3
```



# 仓库

## 容器转镜像

```
docker commit -a="xanxus" d34056ddaf85 centos1.0
```

### Dockerfile

```
vim dockerfile
```

```dockerfile
FROM centos

ENV MYPATH /usr/local
WORKDIR $MYPATH

RUN yum -y install vim
RUN yum -y install nodejs

EXPOSE 80

CMD echo $MYPATH
CMD /bin/bash
```



dockerfile的路径  镜像名字和版本

```
docker build -f /root/dockerfile（dockerfile） -t my-centos:1.0 .(注意不要漏了.)
```

或者

```
docker build -t my-centos .(注意不要漏了.)
```

### Dockerfile命令

```
FROM            # 基础镜像
RUN             # 构建镜像时需要的命令
CMD             # 指定容器启动时需要的命令，会被docker run之后覆盖
ENTRYPOINT      # 指定容器启动时需要的命令，不会被覆盖
ADD             # 步骤，添加ngnix。可以写下载的链接直接下载网络资源，远程服务器资源.(拷贝并解压)
COPY            # 将本地文件拷贝到镜像中
WORKDIR         # 镜像的工作目录，可多次填写
VOLUME          # 挂载的目录
EXPOSE          # 暴露的端口
ONBUID          # 当构建被继承dockerfile的时候，会触发
ENV             # 构建的时候设置环境变量
```

```
定义环境变量
ENV MY_ENV 'xxx'
use $MY_ENV 
```



## docker push

```
docker login -u name
password:xxx

docker push 作者/name：version
```

# docker-compose

```
新建xx.env

env_file:
	- ./xx.env

MYSQL_ROOT_PASSWORD = root
```

# linux 下载docker

```
yum-config-manager \
    --add-repo \
    http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```

```
yum makecache fast
yum install docker-ce docker-ce-cli containerd.io
systemctl start docker
```

