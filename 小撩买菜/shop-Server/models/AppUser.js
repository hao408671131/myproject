import mongoose from 'mongoose'

// 创建管理员(用户)的模式对象
const appUserSchema = mongoose.Schema({
    // 姓名
    real_name: {type: String, default: '小撩宝宝'},
    // 用户名
    user_name: {type: String, required: false},
    // 密码
    user_pwd: {type: String, required: false},
    // 头像
    icon_url: {type: String, default: 'http://www.itlike.com/uploads/picture/20190814/80b52b5d5b25db373c0aee56e7df4e80.png'},
    // 手机号码
    phone: {type: String, required: false},
    // 当前编辑的时间
    l_edit: {type: Date, default: Date.now()},
    // 添加时间
    c_time: {type: Date, default: Date.now()},
});

const AppUser = mongoose.model('appuser', appUserSchema);
export default AppUser;