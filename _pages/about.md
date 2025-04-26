---
permalink: /
title: "About me"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

I'm a first year M.Eng. student from [College of Computing and Data Science](https://www.ntu.edu.sg/computing) (CCDS), Nanyang Technological University. My research interest includes computer vision, computer graphics and embodied AI.

I am very fortunate to be advised by [Prof. Hanwang Zhang](https://personal.ntu.edu.sg/hanwangzhang/) of [MReaL](https://mreallab.github.io/) lab from CCDS, Nanyang Technological University. Previously, I received my B.S. degree at School of Computer Science & Technology, Beijing Institute of Technology. I've been working at Institute for AI Industry Research (AIR), Tsinghua University supervised by [Prof. Hao Zhao](https://sites.google.com/view/fromandto).

You can find my CV here: [Saining Zhang's Curriculum Vitae](../assets/CV.pdf).

News
======
🔥 Our new technical report, [Selftok](https://selftok-team.github.io/report/), is now available. Congratulats to all team members!
🔥 Our new work GaussianArt will be available soon. Thank you all for your anticipation.

Publications \[[Google Scholar](https://scholar.google.com/citations?user=P4efBMcAAAAJ&hl=zh-CN)\]
======
{% include base_path %}

{% for post in site.publications reversed %}
  {% include archive-single.html %}
{% endfor %}
