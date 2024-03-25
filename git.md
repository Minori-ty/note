## git 创建本地分支，并且以远程分支为基础

`git checkout -b 本地分支名 origin/远程分支名`

## git 删除远程分支

`git push origin --delete 远程分支名`

## git 删除本地分支

`git branch -d 本地分支名`

# git submodule

```
## 添加submodule
git submodule add https://

## 更新submodule的代码
git submodule update --remote
## 拉取submodule的代码
git submodule update --init --recursive

```
