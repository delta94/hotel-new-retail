
import Taro from '@tarojs/taro'

// eslint-disable-next-line import/prefer-default-export
export function setSwiperHeight(){ //小程序中swiper高度固定150 如果图片高度大于150会被裁剪 在此根据图片大小动态修改swiper高度
    console.log(22)
}
// export default {
//     //小程序中swiper高度固定150 如果图片高度大于150会被裁剪 在此根据图片大小动态修改swiper高度
//     setSwiperHeight(e){
//         const winWid = Taro.getSystemInfoSync().windowWidth; //获取当前屏幕的宽度
//         const imgh = e.detail.height;//图片高度
//         const imgw = e.detail.width;//图片宽度
//         const swiperH = winWid*imgh/imgw + "px" //
//         return swiperH
//     }
// }