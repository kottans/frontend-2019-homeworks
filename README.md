[![MIT Licensed][icon-mit]][license]
[![Kottans-Frontend][icon-kottans]][kottans-frontend]
#  Frontend 2019 course homeworks
This repo was created for students to submit their homeworks for review. 

## How to submit

### Preparations

- fork this repository
- clone your fork to your local machine: `git clone https://github.com/YOUR_USERNAME/frontend-2019-homeworks.git`
- add this repository as an upstream: `git remote add upstream https://github.com/kottans/frontend-2019-homeworks.git`
- in your local repository, add a folder with your github name under  `submissions`

### Submit a task

In your local repository:

- `git checkout master`
- pull latest changes from upstream `master` branch: `git pull upstream master`
- **IMPORTANT!** create new branch, name it according to task performed (aka feature branch): `git checkout -b dom-api-task`. In this example feature branch is called `dom-api-task`
- under your name folder, add a folder with task name (e.g. `js-dom`) and put your code into the folder

  See example file structure you are expected to have below:

  ![File structure example](img/file-structure.png)

- commit your changes to newly created feature branch
- push feature branch to your remote repository: `git push --set-upstream origin dom-api-task`

### Open a pull request

- open a pull-request from your repository to this repository via GitHub web-interface
- ask course mentors for review in [FE Questionarium chat](https://t.me/joinchat/DmX0JAl-mh5W0jrWli8Ycw),
  post a link to your PR as well
- if necessary, make changes, until your code will be approved and merged

When PR reports conflicts, on your local repo
- `git checkout master`
- pull latest changes from upstream `master` branch: `git pull upstream master`
- merge `master` branch into your feature branch: `git checkout dom-api-task && git merge master`
- resolve merge conflicts if there are any
- push updated feature branch to your remote repository: `git push origin dom-api-task`


[icon-mit]: https://img.shields.io/badge/license-MIT-blue.svg
[license]: https://github.com/OleksiyRudenko/a-tiny-JS-world/blob/master/LICENSE.md

[icon-kottans]: https://img.shields.io/badge/%3D(%5E.%5E)%3D-frontend-yellow.svg
[kottans-frontend]: https://github.com/kottans/frontend
