import React, {useCallback, useRef, useState} from "react";

export default function useImageUpload() {
    const [image, setImage] = useState(null);
    const [imageError, setImageError] = useState(null);
    const [file, setFile] = useState(null);
    const fileRef = useRef(null);

    const reset = useCallback(() => {
        setImage(null);
        setImageError(null);
        setFile(null);
    }, []);

    const imageFileInputChange = useCallback((e) => {
        const reader = new FileReader();
        const file = e.target.files[0];
        if (!file) return;
        if (file.type && !file.type.startsWith('image/')) {
            setImageError('Invalid File Format');
            return;
        }
        reader.addEventListener('load', (event) => {
            setImage(event.target.result);
            setImageError(null);
        });
        setFile(e.target.files[0]);
        reader.readAsDataURL(e.target.files[0]);
    }, []);

    const triggerFileSelector = useCallback(() => {
        fileRef.current.click();
    }, []);

    const ImageUploadComponent = ({className, style}) => (
        <>
            <input accept="image/*" ref={fileRef} onChange={imageFileInputChange}
                className="removeTextDecor d-none" type="file"/>
            {image && !imageError ?
                <img className={className} style={style} src={image} alt=""/>
                :
                <div style={{...style, cursor: 'pointer'}}
                    className={"h-100 w-100 d-flex justify-content-center align-items-center " + className}
                    onClick={triggerFileSelector}>
                    <span className="fa fa-2x fa-plus-square"/>
                </div>
            }
            {
                imageError &&
                <span className="font-weight-bold text-danger">{imageError}</span>
            }
        </>
    );

    return [ImageUploadComponent, file, reset];
}