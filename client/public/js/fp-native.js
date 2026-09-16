(function(){
  var C = window.Capacitor;
  var native = !!(C && typeof C.isNativePlatform === 'function' && C.isNativePlatform());
  window.fpNative = {
    isNative: native,
    platform: (C && typeof C.getPlatform === 'function' && C.getPlatform()) || 'web'
  };
  if(native) document.documentElement.classList.add('fp-native');
  if(!native) return;

  function boot(){
    var Bar = window.CapacitorStatusBar;
    var Style = window.CapacitorStatusBarStyle;
    var Splash = window.CapacitorSplashScreen;
    if(Bar && typeof Bar.setStyle === 'function'){
      Bar.setStyle({ style: (Style && Style.Dark) || 'DARK' }).catch(function(){});
      if(typeof Bar.setBackgroundColor === 'function'){
        Bar.setBackgroundColor({ color: '#FFFBF2' }).catch(function(){});
      }
    }
    if(Splash && typeof Splash.hide === 'function'){
      Splash.hide().catch(function(){});
    }
  }
  if(document.readyState === 'complete') boot();
  else window.addEventListener('load', boot);
})();
