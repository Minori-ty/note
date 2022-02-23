# local本地操作

## clone

### 克隆指定分支

```
git clone -b develop http://gitslab.yiqing.com/declare/about.git
```

### 创建分支并且连接远程分支

```
git checkout -b xx origin/xxx
```



### 克隆全部分支

git base里面执行

```shell
for b in `git branch -r | grep -v -- '->'`; do git branch --track ${b##origin/} $b; done
```



## git rebase合并分支避免merge into...

```
git fetch
git rebase origin/master
解决冲突
git rebase --continue
```



## git remote远程仓库地址

#### git remote add添加远程地址

```
git remote add origin xxx
```

#### git remote set-url修改远程地址

```
git remote set-url origin https://xxx
```



## branch

### --orphan创建干净的分支

```
git checkout --orphan xxx
```



### 删除一个分支

```
git branch -D <branch>
```



### 删除当前分支外的所有分支

git base指令

```
git branch | xargs git branch -D
```



## git 撤销改动

### 未add

```
git checkout . 
git clean -d -f
```

### 已经add

```
git reset .
```

### 已经commit

[版本回滚](#git reset版本回滚)

ctrl单击

### 撤销commit，且保留代码

```
git reset --soft HEAD^
```

### 只修改commit注释

```
git commit --amend
```

进入vim编辑器修改提交信息



## git stash

```
git stash
```



### 恢复stash

```
git stash pop
```



### 删除stash

```shell
git stash list
git stash clear
```

## git log

查看树表图

```
git log --oneline --graph 
```



## git diff

```shell
git diff
```



## git reset版本回滚

```
git reset --hard id
```



## 回到未来的版本

查看未来的id

```
git reflog
```



# remote远程操作

## branch

```shell
git checkout -b dev
git push origin dev:dev
```



## git撤销远程push

```
git log
git reset --soft xxx
git push origin master --force
```





# 代码提交规范

## commitizen

```javascript
npm i -g commitizen
```

在项目中运行：

```javascript
commitizen init cz-conventional-changelog --save --save-exact
```

如果出现

```shell
Attempting to initialize using the npm package cz-conventional-changelog
Error: Error: A previous adapter is already configured. Use --force to override
    adapterConfig.
```

则说明已经成功了，直接git cz

如果还是不行，删除path再重新
commitizen init cz-conventional-changelog --save --save-exact --force


# git常见报错

### OpenSSL SSL_read: Connection was reset, errno 10054

```
git config --global http.sslVerify "false"
```

