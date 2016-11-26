---
layout: post
title:  "How to Backdoor an AWS Server without SSH Keys"
date:   2016-11-19
categories: aws devops
---

If you have accidentally locked yourself out of an AWS server and no longer have access to the original SSH keys 

The basic backdoor process is as follows:
- Create a new AWS instance with a new SSH key
- Create snapshot backups of the old server (just in case)
- Spin down the production server instance and unmount its hard disk volume
- Mount the volume in the new server on a second mount point
- Manually edit ```~/.ssh/authorized_keys``` on the mounted volume
- Unmount and remount the hard disk volume on the production server
- Create and assign an Elastic IP address if you don't want to lose your IP address in future 
- Spin up the production server again
- Update domain DNS settings if you IP address has changed
- SSH into previously unaccessable production server 
 
A more indepth walkthrough can be found here:
- [https://aws.amazon.com/articles/5213606968661598]()
