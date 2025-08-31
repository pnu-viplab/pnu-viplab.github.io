---
title: Knowledge Distillation for Lightweight Deep Network
layout: post
slug: 0004-knowledge-distillation
---

<img src="/assets/img/research/knowledge_distillation.png" style="width:100%;" />

## Abstract

Depth perception capability is one of the essential requirements for various autonomous driving platforms. However, accurate depth estimation in a real-world setting is still a challenging problem due to high computational costs. In this paper, we propose a lightweight depth completion network for depth perception in real-world environments. To effectively transfer a teacher’s knowledge, useful for the depth completion, we introduce local similarity-preserving knowledge distillation (LSPKD), which allows similarities between local neighbors to be transferred during the distillation. With our LSPKD, a lightweight student network is precisely guided by a heavy teacher network, regardless of the density of the ground-truth data. Experimental results demonstrate that our method is effective to reduce computational costs during both training and inference stages while achieving superior performance over other lightweight networks.
