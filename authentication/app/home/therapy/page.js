'use client'
import { getTherapists } from '@/actions';
import LoadMessages from '@/app/ui/loadMessages';
import MessageUserList from '@/app/ui/messageUserList';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


export default function Therapy() {

    const router = useRouter();

    const [listDoc, setListDoc] = useState([]);

    const [selectedDoc, setSelectedDoc] = useState(0);

    const selectDoc = (id) => {
        setSelectedDoc(id)
    }

    useEffect(()=>{
        const getListOfDoc = async () => {
            const response = await getTherapists();
            console.log(response)
            if (!response) {
                alert('unable to get docs, try again later');
                return;
            }

            setListDoc(response)
        }

        getListOfDoc();
    }, [])

    return (
        <div className='pl-10 flex flex-col gap-4 pt-10 w-[500px]'>
            { listDoc && 
                listDoc.map((doc) => {

                    return <div
                        onClick={()=>{router.push('/videoCall')}}
                    >
                        <MessageUserList 
                        username={doc.name}
                        speciality={doc.speciality}
                    /></div>
                })
            }

        </div>
    )
}