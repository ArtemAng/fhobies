import { Typography } from '@material-ui/core';
import { useCallback, useState, Fragment } from 'react';
import { useDropzone } from 'react-dropzone';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    preview: {
        width: 150,
        height: 150
    },
    dropField:{
        position: 'absolute',
        zIndex: 1,
        width: 150,
        margin: 10,
    },
    place:{
        alignItems: 'center',
    }
}));

const Dropzone = ({setImage}) => {

    const classes = useStyles();
    
    const [previewSource, setPreviewSource] = useState(null);

    const onDrop = useCallback(
        (acceptedFile) => {
            const reader = new FileReader();
            reader.readAsDataURL(acceptedFile[0]);
            reader.onloadend = () => {
                console.log(reader.result);
                setPreviewSource(reader.result);
                setImage(reader.result);
            };
        },
        [setImage]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: "image/*",
        multiple: false,
    });
    return (
        <div className={classes.place}>
            <div className={classes.dropField} {...getRootProps()}>
                <input  {...getInputProps()} />
                <div >
                    {isDragActive ? (
                        <Typography variant='h6' component='h6'>
                            Отпустите, для добавления изображения
                        </Typography>
                    ) : (
                            <Typography variant='h6' component='h6'>
                                Перетащите или кликните для добавления изображения
                            </Typography>
                        )}
                </div>
            </div>
            {previewSource && (
                <img
                    className={classes.preview}
                    src={previewSource}
                    alt="preview"
                />
            )}
        </div>
    );
}
export default Dropzone;