import React from 'react';
import { Button, Image, View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation'; // 1.0.0-beta.27
import { createStackNavigator } from 'react-navigation-stack';

import { createBottomTabNavigator } from 'react-navigation-tabs';

import Login from '../components/login/Login';

import WelcomeScreen from '../components/welcomeScreen/WelcomeScreen';

import Home from '../components/home/Home';
import Home2 from '../components/home/Home';
import DanhSachDonHang from '../components/donHang/DanhSachDonHang'
import DanhSachHangHoa from '../components/hangHoa/DanhSachHangHoa'
import DanhSachKhachHang from '../components/khachHang/DanhSachKhachHang'
import Kho from '../components/kho/Kho'
import DonHang from '../components/donHang/DonHang'
import HangHoa from '../components/hangHoa/HangHoa'
import KhachHang from '../components/khachHang/KhachHang'
import MayIn from '../components/mayIn/MayIn'
const TabNavigator = createBottomTabNavigator({
  // TrangChu: Home,
  // ThongKe: Home2,
  DanhSachDonHang: {
    screen: DanhSachDonHang,
    navigationOptions: {
      title: 'Đơn hàng'
    }
  },
  DanhSachHangHoa: {
    screen: DanhSachHangHoa,
    navigationOptions: {
      title: 'Hàng hóa'
    }
  },
  DanhSachKhachHang: {
    screen: DanhSachKhachHang,
    navigationOptions: {
      title: 'Khách hàng'
    }
  },
  Kho: {
    screen: Kho,
    navigationOptions: {
      title: 'Kho'
    }
  },

});

const TAB = createAppContainer(TabNavigator);

const RootStack = createStackNavigator(
  {
    Init: {
      screen: Login,
    },
    Login: {
      screen: Login,
    },
    DanhSachDonHang: {
      screen: DanhSachDonHang
    },
    DanhSachHangHoa: {
      screen: DanhSachHangHoa
    },
    DanhSachKhachHang: {
      screen: DanhSachKhachHang
    },
    Kho: {
      screen: Kho
    },

    MyModal: {
      screen: TAB,
    },
    DonHang: {
      screen: DonHang
    },
    HangHoa: {
      screen: HangHoa
    },
    KhachHang: {
      screen: KhachHang
    },
    MayIn: {
      screen: MayIn
    }

  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

export default createAppContainer(RootStack);
