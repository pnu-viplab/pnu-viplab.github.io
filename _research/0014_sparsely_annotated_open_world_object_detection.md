---
title: Sparsely Annotated Open-World Object Detection
layout: post
slug: 0014-sparsely-annotated-open-world-object-detection
images:
  - /assets/img/research/0014_sparsely_annotated_open_world_object_detection_01.png
  - /assets/img/research/0014_sparsely_annotated_open_world_object_detection_02.png
description: "희소 주석 개방형 객체 탐지(SA-OWOD)를 위한 이중 관점 객체 발견(DPOD) 연구"
---

<img src="/assets/img/research/0014_sparsely_annotated_open_world_object_detection_01.png" style="width:100%;" />
<img src="/assets/img/research/0014_sparsely_annotated_open_world_object_detection_02.png" style="width:100%;" />

## Abstract (Kor)

본 연구는 사진이나 영상 속에서 물체를 찾아내는 **객체 탐지(object detection)** 기술을 다룬다. 객체 탐지 모델은 사람이 미리 표시(주석, annotation)해 둔 정답을 보고 학습하는데, 실제 데이터에서는 이 정답 표시가 완벽하지 않다. 어떤 물체는 사람이 실수로 표시를 빠뜨리기도 하고(**표시가 누락된 아는 물체**), 또 어떤 물체는 애초에 학습 목록에 없는 **처음 보는 새로운 물체**이기도 하다.

문제는 모델 입장에서 이 두 경우가 똑같이 "표시가 없는 영역"으로 보인다는 점이다. 즉 "원래 아는 물체인데 표시가 빠진 것"인지, "정말로 처음 보는 새 물체"인지 구별할 방법이 없어 학습 신호가 서로 모순되고 혼란스러워진다. 지금까지는 표시 누락 문제(희소 주석, SAOD)와 새로운 물체 문제(개방형 탐지, OWOD)를 **각각 따로** 연구해 왔지만, 실제 환경에서는 두 문제가 한 장면 안에 **동시에** 나타난다.

이를 해결하기 위해 본 연구는 두 문제를 함께 고려하는 새로운 과제 **SA-OWOD (Sparsely Annotated Open-World Object Detection)** 를 정의하고, 이를 풀기 위한 통합 방법 **DPOD (Dual-Perspective Object Discovery)** 를 제안한다. DPOD는 서로를 보완하는 두 개의 장치로 이루어진다.

### 1) 아는 물체 되살리기 (KTRM, Known Target Recovery Module)

표시가 빠진 "아는 물체"를 모델이 스스로 다시 찾아내어 임시 정답(pseudo-label)을 붙여 준다. 이렇게 되살린 아는 물체와 처음 보는 새 물체를, 컴퓨터가 이해하는 특징 공간(feature space)에서 **서로 확실히 떨어뜨려** 구분한다. 이를 통해 아는 물체가 배경으로 잘못 취급되어 학습을 망치는 문제와, 아는 물체와 새 물체의 경계가 흐려지는 문제를 함께 해소한다.

### 2) 서로 다른 두 시각의 불일치로 새 물체 찾기 (DDTG, Dual-Disagreement Target Generator)

같은 장면을 조금씩 다르게 변형한 **두 개의 관점(view)** 으로 각각 예측한 뒤, 두 예측이 서로 **엇갈리는(불일치하는) 영역**을 새로운 물체 후보로 판단한다. 아는 물체는 어떤 관점에서 봐도 대체로 일관되게 인식되지만, 처음 보는 물체는 관점에 따라 예측이 흔들리기 쉽다는 점을 활용해, 믿을 만한 새 물체를 안정적으로 발굴한다.

이 두 장치를 결합함으로써 DPOD는 "표시 없는 영역"이 만들어내던 모순된 학습 신호를 정리하고, 아는 물체와 새 물체를 헷갈리지 않도록 하며 판단 기준을 안정화한다. 다양한 실험을 통해 제안 기법이 기존 개방형 탐지 방법들보다, 특히 **처음 보는 새 물체를 찾아내는 데** 우수한 성능을 보임을 입증하였다. 코드는 [공개](https://github.com/HelloHeeju/SA-OWOD)되어 있다.


## Abstract (Eng)

This study addresses **object detection**—finding objects in images and videos. Detection models learn from human-provided labels (annotations), but in real-world data these labels are far from perfect. Some objects are accidentally left unlabeled (**missing annotations of known objects**), while others belong to entirely **new categories the model has never seen before**.

The core difficulty is that, from the model's point of view, both cases look identical: simply an "unlabeled region." The model has no way to tell whether an unlabeled region is "a known object whose label was missed" or "a genuinely new, unseen object," which produces conflicting and confusing training signals. Until now, the missing-label problem (Sparsely Annotated Object Detection, SAOD) and the new-object problem (Open-World Object Detection, OWOD) have been studied **separately**, yet in practice both arise **simultaneously** within a single scene.

To address this, we define a new task, **SA-OWOD (Sparsely Annotated Open-World Object Detection)**, that considers both problems together, and we propose a unified method, **DPOD (Dual-Perspective Object Discovery)**, built from two complementary components.

### 1) Recovering known objects (KTRM, Known Target Recovery Module)

The model itself re-discovers "known objects" whose labels were missed and assigns them temporary labels (pseudo-labels). It then **clearly separates** these recovered known objects from truly new objects in the model's internal feature space. This resolves both the problem of known objects being mistakenly treated as background (which corrupts training) and the problem of the boundary between known and new objects becoming blurred.

### 2) Finding new objects via disagreement between two views (DDTG, Dual-Disagreement Target Generator)

The model makes predictions from **two slightly different views** of the same scene, and regions where the two predictions **disagree** are flagged as candidate new objects. This leverages the intuition that known objects are recognized consistently regardless of viewpoint, whereas genuinely new objects tend to produce unstable predictions across views—allowing reliable discovery of new objects.

By combining these two components, DPOD untangles the contradictory training signals caused by unlabeled regions, prevents confusion between known and new objects, and stabilizes the decision boundary. Extensive experiments show that the proposed method outperforms existing open-world detection approaches, **especially in detecting genuinely new objects**. The code is publicly available at [https://github.com/HelloHeeju/SA-OWOD](https://github.com/HelloHeeju/SA-OWOD).
