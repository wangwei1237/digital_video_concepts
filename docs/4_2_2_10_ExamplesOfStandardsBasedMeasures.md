# Examples of Standards-based Measures
除了前面几节介绍的客观指标外，还有一些基于ITU-T标准的客观的质量度量方法。

## Video Quality Metric
视频质量指标（*VQM, video quality metric*）[^46]是在国家电信和信息管理局（NTIA）开发的感知视频质量的客观测量。由于其在VQEG第2阶段验证测试中的出色性能，美国国家标准协会（ANSI）将VQM作为国家标准，就像ITU将ITU-T Rec J. 144[^47]作为标准一样。VQM测量视频中损伤的感知效果（包括模糊，抖动，全局噪声，块效应和颜色失真等），并将它们组合成单个指标。测试结果表明，VQM与主观视频质量评估之间具有高度相关性。

VQM算法把源视频剪辑和处理过的视频剪辑作为输入，并分四步计算VQM：

1. 校准：在此步骤中，校准采样视频以准备接下来的特征提取。相对于源视频对处理后视频的空间/时间偏移，对比度和亮度偏移进行估计和校正。
2. 质量特征提取：在该步骤中，使用数学函数，从视频流的时空子区域提取表征空间、时间、颜色属性中的感知变化的质量特征集合。
3. 质量参数计算：在该步骤中，通过比较处理视频提取的特征与源视频提取的特征来计算描述视频质量的感知变化的一组质量参数。
4. 计算VQM：使用先前步骤计算出的参数的线性组合来计算VQM。

可以使用基于某些优化标准的各种模型来计算VQM。这些模型包括电视模型，视频会议模型，通用模型，开发人员模型和PSNR模型。VQM通用模型会使用七个参数的线性组合来计算最终的VQM。其中，四个参数基于从亮度分量的空间梯度中提取的特征计算而来，两个参数基于从由两个色度分量形成的矢量中提取的特征计算而来，并且最后一个参数基于对比度和绝对时间信息（两者均提取自亮度分量）。测试结果显示，主观测试与VQM通用模型（*VQMG, VQM general model*）之间的相关系数高达0.95。

## ITU-T G.1070 and G.1070E
ITU-T G.1070[^48]是用于体验质量（*QoE*）规划的标准计算模型。G.1070模型最初是为双向视频通信而开发的，目前已经受到广泛使用、研究、扩展和增强。在G.1070中，视觉质量模型会基于多个因素，包括：帧率，码率和分组数据丢失率。对于固定帧率和固定分组数据丢失率的场景，码率的降低将导致G.1070视觉质量的降低。然而，码率的降低并不一定意味着质量的降低。如果视频内容具有低复杂度且易于编码，则即便码率较低，也可能不会存在质量损失。但G.1070却无法区分如上的这两种情况。

给定视频的码率，帧率和分组数据丢失率，G.1070模型可以用这些信息估计用户端对视频的感知质量，该估计的质量通常以质量分数的形式存在。一般而言，高码率的压缩视频，该质量得分一般较高；而较低码率的压缩视频，该分数一般也较低。

为了计算G.1070的视觉质量，评估系统会包含用于分析压缩比特流相关信息的数据收集器或估计器。该数据收集器用于提取有用信息，估计码率，帧率和分组数据丢失率。根据这三个估计，G.1070视频质量估计器根据G.1070建议的第11.2节中定义的函数来计算视频质量估计。

尽管G.1070模型也适用于估计网络质量（例如预期的分组数据丢失率），但G.1070一般不考虑视频的内容信息。例如，具有复杂背景和高速运动的视频场景，以及包含相对较少的活动或纹理的另一场景，即使它们以相同的码率和帧率进行编码，也会有显著不同的感知质量。而且，简单场景的高质量编码所需的编码码率本来就相对较低。由于G.1070模型通常为低码率视频提供较低的分数，因此对于简单的场景，G.1070存在这种不合理地惩罚。实际而言，该视频场景的感知质量可能很高。同理，G.1070也可能会高估高码率视频的感知质量。因此，G.1070模型可能与最终用户的主观质量得分无关。

为了解决上文提到的G.1070与主观质量得分之间可能存在的不相关性的问题，提出了G.1070的改进模型——G.1070E[^49]。G.1070E会考虑帧复杂度（相当于考虑帧的内容复杂度），并且提供了帧复杂度的估计方法。基于帧复杂度，然后执行码率归一化处理。最后，G.1070使用归一化的码率，帧率以及分组数据丢失率计算视频质量的估计。

G.1070E是一种无参考的压缩域下的客观视频质量度量模型。实验结果表明，G.1070E模型与主观MOS得分具有较高的相关性。G.1070E能够比G.1070更好地反映视频的体验质量。

## ITU-T P.1202.2
ITU-T P.1202系列文件规定了基于基于IP的视频服务的视频质量的模型，该模型通过分组报头和比特流信息来监控视频的质量。ITU-T P.1202.2[^50]建议书规定了具备更高视频分辨率应用的质量模型。P.1202.2具有两种模式：

* 模式1：视频比特流被解析但是并未被解码成像素
* 模式2：视频比特流被完全解码成像素以用于分析

P.1202.2是一种无参考的视频质量指标。该算法的执行需要如下的步骤：

1. 提取视频的基本参数，例如：帧分辨率，帧级别的量化参数，帧的大小，帧的数量。
2. 将这些基本参数聚合到图像级别，从而确定视频帧的复杂度。
3. 将基本参数聚合到模型级别，以获得视频序列复杂度以及视频序列级别的量化参数。
4. 利用$$\ref{式4-28}$$所示的质量评估模型来评估MOS。

$$
    P.1202.2 \ MOS = f(frame \ QP, frame \ resolution, frame \ size, frame \ number) \tag{式4-28}\label{式4-28}
$$

研究发现，P.1202.2算法的估计的MOS结果和VQEG JEG(*Joint Effort Group*)估计的MOS结果类似，均具有相似的皮尔逊线性相关系数（*Pearson linear correlation coefficient*）和斯皮尔曼等级相关系数（*Spearman ranked order correlation coefficient*）[^51]。这种线性关系如下所示：

$$
VQEG \ JEG \ MOS = -0.172 * frame \ QP + 9.249 \tag{式4-29}\label{式4-29}
$$

但是，P.1202.2和VQEG JEG的预测结果逗比MS-SSIM(*multi-scale structural similarity method*，多尺度结构相似性)要差。研究还发现，P.1202.2模型并不能捕获压缩噪声（*compression artifacts*）。

因此，提出了一种基于MS-SSIM的改进的FR MOS估计器。特别是，开发了基于MS-SSIM的重映射功能。得到的MOS估计是关于MS-SSIM和帧参数（例如帧级量化参数，帧大小，帧类型和分辨率）的函数。该算法首先执行设备和内容分析，然后进行空间复杂度计算。

然后，使用逻辑函数（*logistic function*）执行非线性模型拟合。然后MOS估计器利用这些结果以及MS-SSIM值来计算MOS的估计。实验结果表明，对于一组测试集，估计的MOS与MOS之间的皮尔逊相关系数 > 0.9，这比MS-SSIM的0.7265要好得多。

[^46]: A New Standardized Method for Objectively Measuring Video Quality.

[^47]: ITU-T Recommendation J.144: Objective Perceptual Video Quality Measurement Techniques for Digital Cable Television in the Presence of a Full Reference.

[^48]: [ITU-T Recommendation G.1070](https://www.itu.int/rec/T-REC-G.1070-201806-I): Opinion Model for Video-Telephony Applications. 

[^49]: [Efficient Frame Complexity Estimation and Application to G.1070 Video Quality Monitoring](https://ieeexplore.ieee.org/document/6065720). 

[^50]: ITU-T Recommendation P.1202.2: Parametric Non-intrusive Bitstream Assessment of Video Media Streaming Quality – Higher Resolution Application Area. 

[^51]: "Extending the Validity Scope of ITU-T P.1202.2" in Proceedings of the 8th International Workshop on Video Processing and Quality Metrics for Consumer Electronics, retrieved from www.vpqm.org.