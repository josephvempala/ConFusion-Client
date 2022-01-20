import React, { useEffect, useState, useCallback } from "react";

export default React.memo(function ErrorFloater({message, timeout, mode}){

    const [cssClass, setCssClass] = useState(['error-floater',mode ? mode : 'floater-error']);
    const [isVisible, setIsVisible] = useState(false);  
    
    const addCssClass = useCallback((classname) => {
        setCssClass(item => [...item, classname]);
    },[setCssClass]);

    const removeCssClass = useCallback((classname) => {
        setCssClass(item => item.filter(x => x !== classname));
    },[setCssClass]);

    const setVisibility = useCallback((visibility) => {
        if(!visibility){
            removeCssClass('floater-error');
            addCssClass('floater-error-exit');
            setTimeout(()=>{
                removeCssClass('floater-error-exit');
                setIsVisible(false);
            },190)
            return;
        }
        addCssClass('floater-error');
        setIsVisible(true);
    },[addCssClass, removeCssClass]);

    useEffect(()=>{
        if(message && message.length>0){
            setVisibility(true);
            setTimeout(() => {
                setVisibility(false);
            }, timeout);
        }
    },[setVisibility, timeout, message])

    return(
        isVisible ?
        <div className={cssClass.join(' ')}>
            <span>{message}</span>
        </div>
        :
        <>
        </>
    )
})