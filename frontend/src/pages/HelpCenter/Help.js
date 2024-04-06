import React from 'react'
import classes from './help.module.css'
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
              3. Within the Wallpaper menu, you will encounter several choices, including &quot;Choose a New Wallpaper&quot; and &quot;Choose a New Dynamic Wallpaper.&quot; Select the option that aligns with your preference by tapping on it.
              <img className={classes.instruction_img} src='/images/section/help_center/03.jpg' alt="Wallpaper3" />
            </li>

            <li>4. Browse through the available wallpaper options displayed on your screen. You can swipe left or right to view additional wallpapers. Take your time to explore the various categories and styles available.
            <img className={classes.instruction_img} src='/images/section/help_center/04.jpg' alt="Wallpaper4" />
            </li>

            <li>5. Once you&apos;ve found a wallpaper that catches your eye, tap on it to preview it in full screen. You can further customize the wallpaper&apos;s appearance by adjusting its position, size, and scale using intuitive touch gestures such as pinching and zooming.
            <img className={classes.instruction_img} src='/images/section/help_center/06.jpg' alt="Wallpaper6" />
            </li>

            <li>6. After making any desired adjustments, tap on the &quot;Done&quot; button located at the bottom of the screen to proceed to the next step.
            <img className={classes.instruction_img} src='/images/section/help_center/07.jpg' alt="Wallpaper7" />
            </li>

            <li>7. At this point, you will be presented with the option to set the wallpaper for either the Home Screen, Lock Screen, or Both. Choose the appropriate option based on your preferences by tapping on the corresponding selection.
            <img className={classes.instruction_img} src='/images/section/help_center/08.jpg' alt="Wallpaper8" />
            </li>

            <li>8. Once you&apos;ve made your selection, the chosen wallpaper will be applied to the designated screen(s) on your iPhone. You will see a confirmation message indicating that the wallpaper has been successfully set.
            <img className={classes.instruction_img} src='/images/section/help_center/09.jpg' alt="Wallpaper9" />
            </li>

            <li>Exit the Settings app by pressing the Home button or using the swipe-up gesture (on iPhones without a physical Home button) to return to the home screen. You will now be able to enjoy your newly set wallpaper as you navigate through your iPhone&apos;s interface.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
