import {makeStyles} from '@mui/styles';

const UseStyles = makeStyles({
    navbar:{
        backgroundColor:"#203040",
        '& a':{
            color:"#ffffff",
            marginLeft:10
        }
    },
    brand:{
        fontWeight:'bold',
        fontSize:'1.5rem'
    },
    grow:{
       flexGrow:1
    },
    main:{
        minHeight:'80vh'
    },
    section:{
        marginTop:10,
        marginBottom:10
    },
    footer:{
        textAlign:'center',
        marginBottom:10
    },
    form: {
        width: '100%',
        maxWidth: 800,
        margin: '0 auto',
    },
})

export default UseStyles;