# 低功耗平台上典型的媒体应用
低功耗计算平台涵盖了广泛的设备和应用程序。无论是否涉及到多媒体，所有这些设备和应用程序在没有使用或仅部分使用时都需要节省电量。表7-1列举了一些低功耗平台的示例。

**表7-1.** 低功耗平台举例

| 领域 | 举例 | 特殊需求 |
| :--- | :--- | :--- |
| Computing on the go | Smartphones, tablets, netbooks, wearable devices | Small form factor and limited storage capabilities; minimum heat dissipation and special cooling requirements; reduced memory bandwidth and footprint; multiple concurrent sessions; hardware acceleration for media and graphics; sensors; real-time performance; extended battery life |
| Medical equipment | Imaging systems, diagnostic devices, point of care terminals and kiosks, patient monitoring system | Amenable to sterilization; secure, stable and safe to health; resistant to vibration or shock; lightweight and portable; high-quality image capture and display capability; fanless cooling support, etc. |
| Industrial control systems | Operator-controlled centralized controller of field devices | Special I/O requirements, vibration and shock withstanding capabilities, variety of thermal and cooling requirements, ranging from fanless passive heat sink to forced air, etc. |
| Retail equipment | Point of sale terminals, self-checkout kiosks, automatic teller machines (ATMs) | Ability to withstand extreme ambient temperature, good air-flow design, security from virus attacks, non-susceptibility to environmental conditions (dust, rain etc.) |
|Home energy management systems | Centralized monitor of a home’s usage of utilities such as electricity, gas and water; data mining of energy usage for reporting, analysis and customization (e.g., warning users when washing clothes is attempted during peak electrical rates or when a light is left on without anyone present, etc.) | Internet connectivity; various sensors; ability to control various smartphone apps; wireless push notification capability; fanless operation; ability to wake from a low-power or power-down state by sensors or signals from Internet; low power consumption while working as an energy usage monitor |
| In-vehicle infotainment systems | Standalone navigation systems, personal video game player, Google maps, real-time traffic reporting, web access, communication between car, home and office | Ability to withstand extreme ambient temperature; special cooling mechanisms in the proximity of heating and air- conditioning system; small form factor to fit behind dashboard; very low power level (below 5W); fast return from deep sleep (S3) state |
| Digital signage | Flight information display system, outdoor advertising, way-finding, exhibitions, public installations | Rich multimedia content playback; display of a single static image in low-power state; auto display of selected contents upon sensor feedback (e.g., motion detection); intelligent data gathering; analysis of data such as video analytics; real-time performance |
| Special equipment for military and aerospace | Air traffic control, special devices for space stations and space missions, wearable military gears | Security; real-time performance; fast response time; extreme altitude and pressure; wearable rugged devices with Internet and wireless connectivity; auto backup and/or continuous operation |
| Embedded gaming | Video gaming devices, lottery, slot machines | High-end graphics and video playback; keeping attractive image on the screen in low-power state; various human interfaces and sensors; high security requirements; proper ventilation |
| Satellite and telecommunications | Scalable hardware and software in data-centers and base stations, throughput and power management and control | Compliance with guidelines requirements for environmental condition such as National Equipment Building Systems (NEBS); Continuous low-power monitoring |
| Internet of Things | Smart appliances, smart watches, smart earphones, smart bowl | Very low power for control and monitoring; Internet connectivity |

尽管各种低功耗平台的要求各异，但实际需要考虑因素包括：处理器面积，功耗，性能，视觉质量和设计复杂度之间的权衡。在维持低功耗并保证可用性和优雅体验的同时，需要减少不必要的功能或牺牲视觉质量。如上的方法优先考虑简单性而不是性能，以便支持特定设备或应用程序的能效要求。因此，在低功耗平台中，只有极少数的媒体使用是一件司空见惯的事情。对于通过本地和远程无线设备播放并浏览视频、视频录制、以及视频会议而言尤其重要。接下来会讨论这些用法的一些细节。

