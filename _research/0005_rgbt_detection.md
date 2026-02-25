---
title: RGB-Thermal Camera Fusion-based Object Detection
layout: post
slug: 0005-rgbt-detection
images:
  - /assets/img/research/0005_rgbt_detection_01.png
  - /assets/img/research/0005_rgbt_detection_02.png
  - /assets/img/research/0005_rgbt_detection_03.png
description: "RGB-Thermal 카메라 융합 기반 객체 탐지 연구"
---

<img src="/assets/img/research/0005_rgbt_detection_01.png" style="width:100%;" />
<img src="/assets/img/research/0005_rgbt_detection_01.png" style="width:100%;" />
<img src="/assets/img/research/0005_rgbt_detection_03.png" style="width:100%;" />

## Abstract

Object detection is one of the essential tasks in a variety of real-world applications such as autonomous driving and robotics. In a real-world scenario, unfortunately, there are numerous challenges such as illumination changes, adverse weather conditions, and geographical changes, to name a few. To tackle the problem, we propose a novel multi-modal object detection model that is built upon a hierarchical transformer and cross-guidance between different modalities. The proposed hierarchical transformer consists of domain-specific feature extraction networks where intermediate features are connected by the proposed Cross-Guided Attention Module (CGAM) to enrich their representational power. Specifically, in the CGAM, one domain is regarded as a guide and the other is assigned to a base. After that, the cross-modal attention from the guide to the base is applied to the base feature. The CGAM works bidirectionally in parallel by exchanging roles between modalities to refine multi-modal features simultaneously. Experimental results on FLIR-aligned, LLVIP, and KAIST multispectral pedestrian datasets demonstrate that the proposed method is superior to previous multi-modal detection algorithms quantitatively and qualitatively.
