//时间YYYY.MM.DD HH:mm
export const moment = (date: Date | string | number | undefined) => {
    if (!date) return '';
    
    let dateObj: Date;
    
    if (date instanceof Date) {
      dateObj = date;
    } else if (typeof date === 'string') {
      // 尝试将字符串解析为日期
      dateObj = new Date(date);
    } else if (typeof date === 'number') {
      // 处理时间戳
      dateObj = new Date(date);
    } else {
      return '';
    }
    
    // 检查日期是否有效
    if (isNaN(dateObj.getTime())) {
      return '';
    }
    
    // 格式化日期
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    
    return `${year}.${month}.${day}`;
  }
  
  // 可选：添加带时间的版本
  export const momentWithTime = (date: Date | string | number | undefined) => {
    if (!date) return '';
    
    let dateObj: Date;
    
    if (date instanceof Date) {
      dateObj = date;
    } else if (typeof date === 'string') {
      dateObj = new Date(date);
    } else if (typeof date === 'number') {
      dateObj = new Date(date);
    } else {
      return '';
    }
    
    // 检查日期是否有效
    if (isNaN(dateObj.getTime())) {
      return '';
    }
    
    // 格式化日期和时间
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    
    return `${year}.${month}.${day} ${hours}:${minutes}`;
  }