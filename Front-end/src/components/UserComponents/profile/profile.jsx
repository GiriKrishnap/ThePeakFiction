import axios from '../../../util/axios'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthorAddChapter, CoverUrl, getNovelDetailsWithId } from '../../../util/constants';
//.........................................................................

export default function ProfileComponent() {

    //.........................................................................

    const location = useLocation();
    const navigate = useNavigate();

    //.........................................................................


    //.........................................................................

    return (

        <>
            PROFILE IS HERE
        </>
    )
}
//.........................................................................
