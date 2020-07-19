---
title: Git 小技巧 - 忽略不想要提交的本地修改
tags:
  - Git
  - 工具
  - 小技巧
category: 编程
date: 2020-07-17 20:22:32
---

这个系列打算不定期更新一些关于 Git 的小技巧，希望能帮助到有需要的同学。

## 忽略本地修改
在一个多人协作的 Git 仓库里，有些情况下远程仓库中可能会存放一些 IDE 或者 Build 工具的配置文件，以方便所有参与的同学获得一致的体验。当然这些文件会从大局出发，加入的通常都是比较通用的配置项，不一定能完全满足你个人的需求。一旦你自己对这些文件做了个人定制，它们就会被 Git 识别为本地修改，不但本地的 `git status` 或 `change list` 一直会进行恼人的提醒，而且每次 `git add` 文件时还要小心翼翼的避开。

那么，有没有方法告诉 Git 我们可以忽略这些文件的本地修改呢？答案是有的，你只需要下面这条命令：

<!-- more -->

```sh
git update-index --skip-worktree /path/to/file
```
执行这条命令后，Git 就会忽略本地对这个文件的所有修改。现在可以放心大胆地 `git add .`/`git add -u` 啦!

这条命令相比 `.gitignore` 的方式，省去了修改 `.gitignore` 文件，否则还要再想办法忽略本地对 `.gitignore` 的修改……

### 副作用
这种方式也有一个副作用，那就是在拉取远程分支时，由于本地和远程文件存在不一致的更新，会导致冲突的问题。
比如 ./foo.config 文件是一个已经存在远程仓库的配置文件，其内容是

```sh
> cat ./foo.config
a
```

本地对它加了一行：
```sh
> cat ./foo.config
a
b
```

而远程仓库有人提交了另一个更新：
```sh
> cat ./foo.config
a
c
```

那么在 `git pull` 时，远程分支和本地分支就会存在冲突，需要手动处理冲突。处理冲突前，还需要先把已经忽略掉的文件再恢复回来，命令还比较好记，就是 `--skip-worktree` 换成 `--no-skip-worktree` 就可以了:
```sh
git update-index --no-skip-worktree /path/to/file
```

### 查看被忽略的文件项目
如果时间久了，忘了哪些文件被忽略了，那么可以通过 `git ls-files -v` 来查看，其结果中第一列打 `H` 标记的项目就是被忽略（Hide）的项目。我们可以通过 `grep` 或是 PowerShell 中的 `Select-String` 来将这些项目过滤出来。
```sh
git ls-files -v | grep -E -i /path/to/file
git ls-files -v | Select-String -Pattern /path/to/file
```

## 各种忽略文件的方法对比
除了 `--skip-worktree` 的方式，Git 也有其它的机制可以忽略文件的修改，大概有这么几类：

1. [gitignore 文件](https://git-scm.com/docs/gitignore).
3. .git/info/exclude 文件
2. `git update-index --assume-unchanged` （[官方文档](https://www.git-scm.com/docs/git-update-index)）
2. `git update-index --skip-worktree`（[官方文档](https://www.git-scm.com/docs/git-update-index)）


这里简单区分一下：

- .gitignore
    - **说明**：显式地阻止提交文件。
    - **优势**：.gitignore 文件本身提交至远程仓库，全组共享忽略文件配置。
    - **局限**：如果项目已经存在远程仓库，即使被加入 .gitignore，仍然可以进行修改并提交。本地的修改会显示在 `git status` 结果中。 
- .git/info/exclude
    - **说明**：显式地阻止提交文件。
    - **优势**：exclude 文件本身不会提交至远程仓库，因此适合放一些个人定制的 「gitignore」 项目。
    - **局限**：和 .gitignore 存在同样地局限。文件若已存在远程仓库，则本地修改仍可以提交至远程仓库。本地的修改会显示在 `git status` 结果中。
- assume-unchanged
    - **说明**：声明本地远程都**不会修改**这个文件。
    - **优势**：git 直接跳过这些文件的处理以提升性能。文件不会出现在 `git status`。
    - **局限**：不适合本地或远程需要修改的文件。本地会忽略掉之后远程文件的修改。
- skip-worktree
    - **说明**：声明忽略文件的本地修改。
    - **优势**：本地可以对文件做一些个人定制。文件不会出现在 `git status`。
    - **局限**：拉取远程文件更新，或切换分支时有可能出现冲突，需要撤销忽略后手动解决冲突。 

## 更多阅读
1. [Git Doc/update-index](https://www.git-scm.com/docs/git-update-index)
2. [Git Doc/gitignore](https://git-scm.com/docs/gitignore)
3. [How to ignore files already managed with Git locally](https://dev.to/nishina555/how-to-ignore-files-already-managed-with-git-locally-19oo)