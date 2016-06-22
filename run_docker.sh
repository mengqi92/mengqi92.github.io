#!/usr/bin/env bash
docker run -p 4000:80 --name hexo-server -d \
    -v /Users/Mengqi/.ssh:/root/.ssh \
    -v /Users/Mengqi/self/blog/source:/Hexo/source \
    -v /Users/Mengqi/self/blog/themes:/Hexo/themes \
    -v /Users/Mengqi/self/blog/_config.yml:/Hexo/_config.yml \
    iyannik0215/docker-hexo mengqi92 mengqipei@gmail.com s
