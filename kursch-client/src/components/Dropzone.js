import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import { useCallback, useState, Fragment } from 'react';
import { useDropzone } from 'react-dropzone';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    preview: {
        margin: 10
    },
    text: {
        textAlign: 'center',
        color: '#8d8d8d',
    },
    dropField: {
        border: '1px dashed #8d8d8d ',
        borderRadius: 5
    },
    place: {
        height: 250,
        alignItems: 'center',
    }
}));

const Dropzone = ({ setImage }) => {

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
        <Card className={classes.place}>
            <CardContent className={classes.dropField} {...getRootProps()}>
                <input className={classes.input}  {...getInputProps()} />
                <div >
                    {isDragActive ? (
                        <Typography variant='p' component='h4' className={classes.text}>
                            Drop your image
                        </Typography>
                    ) : (
                            <Typography  component='p' className={classes.text}>
                                Drag or choose your image here
                            </Typography>
                        )}
                </div>
            </CardContent>
            {previewSource && (
                <CardMedia
                    component='img'
                    alt='collection item photo'
                    src={previewSource}/>
            )}
        </Card>
    );
}
export default Dropzone;