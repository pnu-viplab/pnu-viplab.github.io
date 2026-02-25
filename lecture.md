---
layout: page
title: Lecture
permalink: /lecture/
---

{% for sem in site.data.lecture %}
## {{ sem.semester }}

{% for course in sem.courses %}- {{ course }}
{% endfor %}

{% endfor %}
