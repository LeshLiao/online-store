import React from 'react'
import classes from './set_photo.module.css'

export default function SetPhoto () {
  return (
    <div className={classes.container}>
            <div className={classes.wallpaper_setup}>
              <div className={classes.title}>How to download FREE wallpaper</div>
              {/* <img className={classes.title_img} src='/images/section/help_center/cover.png' alt="Wallpaper0" /> */}
              {/* <div className={classes.instructions}> */}
              <ul className={classes.content}>
                <li>
                  1. Choose Your Wallpaper:
                  Browse through our wide selection of wallpapers, ranging from stunning landscapes to captivating anime scenes and bustling cityscapes. Once you find the wallpaper you like, simply tap the &quot;Free&quot; button or download icon to proceed.
                  <img className={classes.instruction_img} src='/images/section/how_to_download/01.jpg' alt="Wallpaper1" />
                </li>

                <li>
                  2. Initiate Download: Upon clicking the free download button, a file download pop-up message will appear on your screen. Simply click &quot;Download&quot; to initiate the download process. If, for any reason, you don&apos;t see the pop-up download message, you can also click the &quot;Download it Again&quot; button to ensure the download starts.
                  <img className={classes.instruction_img} src='/images/section/how_to_download/02.jpg' alt="Wallpaper2" />
                </li>

                <li>
                  3. Access Downloads Page: After successfully downloading the wallpaper, navigate to the top of your browser window. Here, you&apos;ll find the &quot;AA&quot; icon located on the address bar. Click on it to reveal a dropdown menu, and then select &quot;Downloads&quot; from the options provided.
                  <img className={classes.instruction_img} src='/images/section/how_to_download/04.jpg' alt="Wallpaper3" />
                </li>
                <li>
                  4. View Downloaded Files: Upon selecting &quot;Downloads,&quot; you&apos;ll be directed to a page where you can view all your downloaded files. Locate the wallpaper file you just downloaded and click on it to open it.
                  <img className={classes.instruction_img} src='/images/section/how_to_download/05.jpg' alt="Wallpaper4" />
                </li>
                <li>
                  5. Preview Wallpaper: Once the file is opened, you&apos;ll be able to preview the wallpaper in full detail. Take a moment to admire its beauty and ensure it meets your preferences. To proceed with saving the wallpaper to your phone&apos;s photo library, locate the function button at the bottom of the picture, and click it.
                  <img className={classes.instruction_img} src='/images/section/how_to_download/06.jpg' alt="Wallpaper5" />
                </li>
                <li>
                  6. Save to Photo Library: Upon clicking the function button, a menu will appear with various options. Select &quot;Save Image&quot; from the menu to save the wallpaper directly to your phone&apos;s photo library.
                  <img className={classes.instruction_img} src='/images/section/how_to_download/07.jpg' alt="Wallpaper6" />
                </li>
                <li>
                  By following these steps, you&apos;ll be able to effortlessly download and save your desired wallpaper to your iPhone&apos;s photo library, ensuring you can enjoy it as your background whenever you desire.
                </li>
              </ul>
      </div>
    </div>
  )
}
