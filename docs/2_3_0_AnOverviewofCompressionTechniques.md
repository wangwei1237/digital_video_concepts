# 压缩技术概述
高清无压缩视频（*HD*）数据流需要大约20亿比特/秒的数据带宽。由于需要大量数据来表示数字视频，视频信号必须易于压缩和解压缩，从而使的视频数据的存储或传输成为现实。数据压缩是指利用数据的统计特性来减少存储或传送数据所需的比特数，这些数据包括数字，文本，音频，语音，图像和视频。幸运的是，由于视频数据在垂直，水平和时间维度存在相关性和冗余性，因此视频数据具有高度可压缩的特性。

变换和预测技术可以有效地利用数据之间可用的相关性，信息编码技术也可以利用视频数据中存在的这些统计特性。数据压缩技术可以是无损的，因此数据解压缩时能够精确的重建原始数据。然而，在视频数据压缩领域，通常会采用有损压缩技术。有损压缩的技术利用了HVS对某些色彩损失和特殊类型的噪声不敏感的特性，从而可以在不影响用户视觉的条件下将不敏感的信息丢弃。

视频的压缩和解压缩过程会利用信息编码理论，并且压缩后的数据是以编码比特流（*coded bit stream*）格式呈现。因此，视频压缩和解压缩通常也被称为视频编码和解码。