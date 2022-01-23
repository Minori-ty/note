pwd

# 下载镜像

```
docker pull centos tag:xx
```

# 删除镜像

```
删除一个容器：
docker rmi -f id

删除全部容器：
docker rmi -f $(docker images -aq)
```

![image-20210404231527191](C:\Users\15638\AppData\Roaming\Typora\typora-user-images\image-20210404231527191.png)

![image-20210404231740198](C:\Users\15638\AppData\Roaming\Typora\typora-user-images\image-20210404231740198.png)

![image-20210404231825676](C:\Users\15638\AppData\Roaming\Typora\typora-user-images\image-20210404231825676.png)

docker start id

docker attach id 进入容器

![image-20210404232746851](C:\Users\15638\AppData\Roaming\Typora\typora-user-images\image-20210404232746851.png)

docker run -d 在后台启动



docker search --filter=start=30 xx



# 启动镜像

```
docker run --name web -it images //-it交互模式进入容器
```

进入项目的dist目录，$(pwd)会映射出当前项目的目录（linux）

```
docker run --name web-server -d -p 8000:80 -v $(pwd):/usr/share/nginx/html nginx
```



# 退出容器

```
exit
ctrl+p+q
```



# 删除容器

```
docker rmi images  删除镜像
docker rm  id      删除容器
```

强制删除 -f



# 端口映射

```
docker run -d --name web-nginx -p 3344:80 nginx 
```



# 启动和停止容器

```
docker start id
docker restart id
docker stop id
docker kill id 停止当前正在运行的容器
```



## 后台启动镜像

```
docker run -d id
```

## 进入正在运行的容器

```
docker exec -it id /bin/bash（必须）
docker attach id
```



## 创建文件

```
touch docker.js
```



# 把docker容器里面的文件拷贝到当前服务器中

```
docker cp -r id:/home/home.js /root
```



# 部署nginx

-p 端口映射 主机端口:容器端口

```
docker run -d --name web-nginx -p 3344:80 nginx 
```



# 提交images

```
docker commit -a="xanxus" d34056ddaf85 centos1.0
```



# 容器数据卷

```
docker run -it -v 主机目录：容器目录 centos
docker run -it -v /home/ssr:/home centos
```

```
docker inspect id //查看挂载是否成功
```

# Dockerfile

```
vim dockerfile
```

```
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



## 命令

```
FROM            # 基础镜像
RUN             # 构建镜像时需要的命令
ADD             # 步骤，添加ngnix。可以写下载的链接直接下载网络资源
WORKDIR         # 镜像的工作目录，可多次填写
VOLUME          # 挂载的目录
EXPOSE          # 暴露的端口
CMD             # 指定容器启动时需要的命令，只有最后一个命令会生效
ENTRYPOINT      # 指定容器启动时需要的命令
ONBUID          # 当构建被继承dockerfile的时候，会触发
COPY            # 将文件拷贝到镜像中
ENV             # 构建的时候设置环境变量
```

# 编写Dockerfile

```

```

# docker push

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

