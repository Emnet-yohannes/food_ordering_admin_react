import React from 'react'
import EditSetting from './EditSetting/EditSetting'
import DeleteSetting from './DeleteSetting/DeleteSetting'

const SettingActions = ({ setting  }) => {
    return (
        <div style={{display:"flex" , margin:"10px"}}>
            <EditSetting  settings={setting} />
            <DeleteSetting  settings={setting}/>
            
        </div>
    )
}

export default SettingActions
