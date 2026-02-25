---
title: Lightweight 3D Depth Completion via Affinity Distillation
layout: post
slug: 0007-affinity-distillation
images:
  - /assets/img/research/0007_affinity_distillation_01.png
  - /assets/img/research/0007_affinity_distillation_02.png
  - /assets/img/research/0007_affinity_distillation_03.png
description: "Affinity 증류 기법을 이용한 경량 3D 깊이 추정 연구"
---

<img src="/assets/img/research/0007_affinity_distillation_01.png" style="width:100%;" />
<img src="/assets/img/research/0007_affinity_distillation_02.png" style="width:100%;" />
<img src="/assets/img/research/0007_affinity_distillation_03.png" style="width:100%;" />

## Abstract

Depth completion is one of the crucial methods to estimate dense depth information of surrounding environments for various real-world applications such as autonomous driving, robotics, and augmented reality. In these real-world applications, it is strictly required for a depth completion model to achieve lightweight network architectures and reduced computational costs to operate in real-time. With this in mind, we propose a non-local afﬁnity distillation network for lightweight depth completion. Our method utilizes a minimal number of neighbors with strong afﬁnities for fast spatial propagation by optimal transport between teacher and student afﬁnities through knowledge distillation. Moreover, existing depth completion algorithms solely focus on exploiting measured LiDAR points of objects while disregarding miss- ing ones ﬁred into the air completely. Since missing rays of a LiDAR sweep can be easily identiﬁed based on the data acquisition pipeline of LiDAR sensors, we propose to utilize guidance from missing LiDAR points to further improve the performance of our network especially in regions without LiDAR points. Experimental results show that our method is superior to previous lightweight networks as well as comparable to heavy depth completion methods.
