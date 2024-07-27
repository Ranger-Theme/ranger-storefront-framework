const BaiduAnalytics = ({ key }) => {
  const getAnalyticsTag = () => {
    return {
      __html: `
        var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?${key}";
          var s = document.getElementsByTagName("script")[0];
          s.parentNode.insertBefore(hm, s);
        })();
      `
    }
  }

  return <script dangerouslySetInnerHTML={getAnalyticsTag()} />
}

export default BaiduAnalytics
