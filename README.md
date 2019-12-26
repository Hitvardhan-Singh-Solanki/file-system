## File system front end using react , redux and react-router

<!-- [Link to design](​http://nosmalltask2.s3-website.ap-south-1.amazonaws.com/) -->

Explanation​:

1. The webapp mounts to the root route i.e. “/​”
   This would list all subdirectories to root.
2. The app will also display the “current path” in the navbar
3. Double clicking a directory should update the “current path” as well as change the view
   with all the files & folders present inside this new directory.
4. There will be a Up​ button which will lead you one step above in the directory structure

5. On right click of a file/folder, secondary menu popups with 3 options
   ● Open - navigate into the folder, open info popup
   ● Get Info - Opens info popup for both file & folder.
   ● Delete - remove file/folder from the system

6. Each folder would have an Create/Add ​button, which would trigger a popup to create a
   new file/folder with associated meta fields - name(with extension for files), creator, size
   and date

Instructions:

1. Choose your own front-end framework (Preference given to React/Redux)
2. Use of ES6 syntax is highly encouraged
3. The code should be clean and structured correctly

### Install instructions(developer mode)

- run `npm i` / `yarn add`
- run `npm run start`

### Install Build(prod mode)

- `npm run build`
- `npm install -g serve`
- `serve -s build`
