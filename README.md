# Setup (for the team)

(Delete your current node modules, and run `npm install` upon switching to this branch)

1. Find the latest android/ios build (depending on your platform) at the Expo project page > Builds
2. Follow the instructions on the build's page
   - Notes: For android,
       - to run it on your phone, scanning the QR code works. But if you wish to run it on the emulator, run the following:
         ```sh
         # Step 1:
         npm install -g eas-cli
         
         # Step 2: login using expo account credentials
         eas login

         # Step 3: confirm you're logged in
         eas whoami

         # Step 4: install build
         eas build:run -p android --latest
         ```
    - Notes: For ios,
        - The build is for the ios simulator. (The docs say you need an apple developer account to run it directly on your device so I'm not sure how that works)
        - Haven't tested it myself, but if the instructions on the build page don't work, steps 1-3 should work the same for the simulator, and then follow the [docs](https://docs.expo.dev/build-reference/simulators/#installing-build-on-the-simulator) for step 4 (replacing the word 'android' for 'ios' mostly)
     
3. Once the build is installed, run as you would normally do with Expo Go using `npx expo start`!
   
   (`npx expo start -c` if you have cache issues)
