import { statusApp } from '../custom/statusApp'
import { formatNewDateToDate, formatNewDateToTime } from '../../utils/FormatTime'
const textForm = (id, type, title, label, value, editable, require, tag) => {
    return {
        id, type, title, label, value, editable, require, tag, onPress: () => { }
    }
}

const textEditForm = (id, type, title, label, value, editable, require, tag, typeEdit) => {
    return {
        id, type, title, label, value, editable, require, tag, typeEdit, onPress: undefined
    }
}

const chooseImage = (id, type, title, label, value, editable, require, tag) => {
    return {
        id, type, title, label, value, editable, require, tag
    }
}

const pickerForm = (id, type, title, label, value, editable, require, tag) => {
    return {
        id, type, title, label, value, editable, require, tag,
        items: [],
        onPress: undefined,
        itemSelected: undefined
    }
}

const datePickerForm = (id, type, title, label, value, editable, require, tag) => {
    return {
        id, type, title, label, value, editable, require, tag,
        onPress: () => { }
    }
}

const timePickerForm = (id, type, title, label, value, editable, require, tag) => {
    return {
        id, type, title, label, value, editable, require, tag,
        onPress: () => { }
    }
}
const checkBoxForm = (id, type, title, label1, label2, value, editable, require, tag) => {
    return {
        id, type, title, label1, label2, value, editable, require, tag
    }
}
export const themHangHoaForm = () => {

    return [
        textEditForm('1', 'textEditForm', 'Mã sản phẩm', '', undefined, true, true, 'MaSP', statusApp.textEditForm),
        textEditForm('2', 'textEditForm', 'Tên sản phẩm', '', undefined, true, true, 'TenSP', statusApp.textEditForm),
        textEditForm('3', 'textEditForm', 'Giá bán', '0', 0, true, false, 'GiaBan', statusApp.numberEditForm),
        textEditForm('4', 'textEditForm', 'Giá vốn', '0', 0, true, false, 'GiaVon', statusApp.numberEditForm),
        textEditForm('5', 'textEditForm', 'Số lượng tồn kho', '0', 0, true, false, 'SoLuongTonKho', statusApp.numberEditForm),
        textEditForm('6', 'textEditForm', 'Số lượng đã bán', '0', 0, true, false, 'SoLuongDaBan', statusApp.numberEditForm),
        textEditForm('7', 'textEditForm', 'Số lượng đã mua', '0', 0, true, false, 'SoLuongDaMua', statusApp.numberEditForm),
        chooseImage('8', 'chooseImage', 'Chọn hình', '', '', true, false, 'ChonHinh')
    ]
}


export const themKhacHangForm = () => {
    return [
        textEditForm('1', 'textEditForm', 'Mã khách hàng', '', undefined, true, true, 'MaKH', statusApp.textEditForm),
        textEditForm('2', 'textEditForm', 'Tên khách hàng', '', undefined, true, true, 'TenKH', statusApp.textEditForm),
        textEditForm('3', 'textEditForm', 'Địa chỉ', '', undefined, true, false, 'DiaChi', statusApp.textEditForm),
        textEditForm('4', 'textEditForm', 'Số điện thoại', '', undefined, true, false, 'SoDienThoai', statusApp.textEditForm),
        textEditForm('5', 'textEditForm', 'Tổng tiền bán', '0', 0, true, false, 'TongTienBan', statusApp.numberEditForm),
        textEditForm('6', 'textEditForm', 'Tổng tiền mua', '0', 0, true, false, 'TongTienMua', statusApp.numberEditForm),
    ]
}

export const taoDonHangForm = () => {
    return [
        textEditForm('1', 'textEditForm', 'Mã đơn hàng', '', undefined, true, true, 'MaDH', statusApp.textEditForm),
        checkBoxForm('2', 'checkBoxForm', 'Loại đơn hàng', 'Đơn hàng nhập', 'Đơn hàng bán', 0, true, true, 'LoaiDonHang'),
        datePickerForm('3', 'datePickerForm', 'Ngày', new Date().getTime(), new Date().getTime(), true, true, 'Ngay'),
        timePickerForm('4', 'timePickerForm', 'Giờ', new Date().getTime(), new Date().getTime(), true, true, 'Gio'),
        pickerForm('5', 'pickerForm', 'Sản phẩm', '', undefined, true, false, 'SanPham'),
        textEditForm('6', 'textEditForm', 'Giá vốn', '0', 0, false, false, 'GiaVon', statusApp.numberEditForm),
        textEditForm('7', 'textEditForm', 'Số lượng', '0', 0, true, false, 'SoLuong', statusApp.numberEditForm),
        textEditForm('8', 'textEditForm', 'Tổng tiền', '0', 0, true, false, 'TongTien', statusApp.numberEditForm),
        pickerForm('9', 'pickerForm', 'Khách hàng', '0', 0, true, false, 'KhachHang'),
    ]
}

export const mayInform = () => {
    return [
        pickerForm('1', 'pickerForm', 'Dòng máy in', '', undefined, true, false, 'DongMayIn'),
        textEditForm('2', 'textEditForm', 'Địa chỉ IP', '', '', false, false, 'DiaChiIP', statusApp.textEditForm),
        textEditForm('3', 'textEditForm', 'Tên máy in', '', '', false, false, 'GiaVon', statusApp.textEditForm)
    ]
}





