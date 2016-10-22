---
layout: post
title:  US Presidential Primary Debates 2016 
date:   2016-10-21 17:00:00 +0100
categories: data-visualization
---

> "It's Just Words, Folks, Just Words" - Donald Trump




## Source Files

| Date | File | Source |
| ---- | ------ | ---- |
| 2016-10-21 | [primary_debates_cleaned.csv](/projects/usa_presidential_election_2016/data/primary_debates_cleaned.csv) | [Kaggle](https://www.kaggle.com/kinguistics/2016-us-presidential-primary-debates) |  
| 2016-10-21 | [common_words.json](jekyll/projects/usa_presidential_election_2016/data/common_words.json) | [http://www.duboislc.org/ED-Watch/Words/1-100.html]() |  

## Transformations

Full transcripts of the debates among all the 2016 contenders for US President provided by Kaggle.
Applied some some additional cleanup and filtered out the 100 most commonly used words.
Created a JSON dictionary of wordcounts, additionally grouped by Date, Speaker, Location and Party            


<script src="/_webpack/usa_presidential_election.js"/>
