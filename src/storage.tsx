import AsyncStorage from '@react-native-async-storage/async-storage';

export default class StorageUtil {
  /**
   * 获取数据
   * @param key 数据的key值
   * @return {Promise<any> | Promise}
   */
  static getItem(key: string) {
    return new Promise<any>((resolve, reject) => {
      AsyncStorage.getItem(key, (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        // 判断是否是个对象
        try {
          resolve(JSON.parse(result!));
        } catch (e) {
          resolve(result);
        }
      });
    });
  }

  /**
   * 保存数据
   * @param key
   * @param data
   */
  static setItem(key: string, data: any) {
    data = typeof data === 'object' ? JSON.stringify(data) : data;
    AsyncStorage.setItem(key, data, error => {
      if (error) {
        //Tips.toast('保存失败');
      }
    });
  }

  /**
   * 删除数据
   * @param key
   */
  static removeItem(key: string) {
    AsyncStorage.removeItem(key, error => {
      if (error) {
        //Tips.toast('删除失败');
      }
    });
  }

  /**
   *  删除json文件
   */
  static clear() {
    AsyncStorage.clear(error => {
      if (error) {
        //Tips.toast('文件删除失败');
      }
    });
  }
}
