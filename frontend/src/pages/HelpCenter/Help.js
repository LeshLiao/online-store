import React from 'react'
import classes from './help.module.css'
import AdsComponent from '../../components/GoogleAdSense/AdsComponent'
// import PaintingThumbnails from '../../components/Thumbnails/PaintingThumbnails'
// import { getAllLive } from '../../services/itemService'

export default function Help () {
  // const [items, setItems] = useState([])

  // useEffect(() => {
  //   getAllLive().then(items => setItems(items))
  // }, [])
  return (
    <div>
      <div className={classes.top_container}></div>
      <div className={classes.container}>
        <div className={classes.wallpaper_setup}>
          <h3>How to Set Up Wallpaper on iPhone: Step by Step</h3>
          <img className={classes.title_img} src='/images/section/help_center/cover.png' alt="Wallpaper0" />
          {/* <div className={classes.instructions}> */}
          <ul className={classes.content}>

            <li>
              1. Unlock your iPhone by pressing the Home button or using Face ID or Touch ID authentication, and navigate to the home screen.
              <img className={classes.instruction_img} src='/images/section/help_center/01.jpg' alt="Wallpaper1" />
            </li>

            <li>2. Locate and tap on the &quot;Settings&quot; app icon, which resembles a gear or cogwheel, to open the Settings menu. Once inside the Settings menu, scroll down the list of options until you find the category labeled &quot;Wallpaper&quot; and tap on it to proceed.
            <img className={classes.instruction_img} src='/images/section/help_center/02.jpg' alt="Wallpaper2" />

            </li>
            <li>
              3. Within the Wallpaper menu, you will encounter several choices, including &quot;Add New Wallpaper&quot; and &quot;Customize&quot; Select the option that aligns with your preference by tapping on it.
              <img className={classes.instruction_img} src='/images/section/help_center/03.jpg' alt="Wallpaper3" />
            </li>

            <li>4. Explore the array of wallpaper options presented on your screen. Swipe left or right to browse through additional wallpapers, and take your time delving into the diverse categories and styles available. Additionally, you have the option to select &quot;Photos&quot; from your photo library.
            <img className={classes.instruction_img} src='/images/section/help_center/04.jpg' alt="Wallpaper4" />
            </li>

            <li>5. Once you&apos;ve found a wallpaper that catches your eye, tap on it to preview it in full screen. You can further customize the wallpaper&apos;s appearance by adjusting its position, size, and scale using intuitive touch gestures such as pinching and zooming. When satisfied, simply press the &quot;Add&quot; button to apply your changes.
            <img className={classes.instruction_img} src='/images/section/help_center/06.jpg' alt="Wallpaper6" />
            </li>

            <li>6. After making any desired adjustments, proceed to the next step by tapping either the &quot;Set as Wallpaper Pair&quot; or &quot;Customize Home Screen&quot; button.
            <img className={classes.instruction_img} src='/images/section/help_center/07.jpg' alt="Wallpaper7" />
            </li>

            <li>7. At this point, you have the option to click &quot;Blur&quot; to cancel if desired, or to adjust colors and gradients on the Home Screen. Select the appropriate option based on your preferences by tapping the corresponding selection. Afterward, tap &quot;Done&quot; to proceed.
            <img className={classes.instruction_img} src='/images/section/help_center/08.jpg' alt="Wallpaper8" />
            </li>

            <li>8. Once you&apos;ve made your selection, the chosen wallpaper will be applied to the designated screen(s) on your iPhone. You will see a &quot;CURRENT&quot; indicating that the wallpaper has been successfully set.
            <img className={classes.instruction_img} src='/images/section/help_center/09.jpg' alt="Wallpaper9" />
            </li>

            <li>Exit the Settings app by pressing the Home button or using the swipe-up gesture (on iPhones without a physical Home button) to return to the home screen. You will now be able to enjoy your newly set wallpaper as you navigate through your iPhone&apos;s interface!</li>
          </ul>
        </div>
      </div>
      <div className={classes.googleAdSense}>
        <AdsComponent dataAdSlot='5241169412' format='autorelaxed'/>
      </div>
    </div>
  )
}
