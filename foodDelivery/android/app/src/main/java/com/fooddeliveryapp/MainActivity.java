package com.fooddeliveryapp;
import com.facebook.react.ReactActivity;
import android.os.Bundle;

// react-native-splash-screen
import org.devio.rn.splashscreen.SplashScreen; 

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "FoodDeliveryApp";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    // react-native-splash-screen
    SplashScreen.show(this);
    super.onCreate(savedInstanceState);
  }
}
