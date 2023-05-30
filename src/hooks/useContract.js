import { useEffect, useState } from 'react';
import { ethers } from "ethers";
import abi from '../contractJson/TodoLists.json';
const useContract=(reload)=>{
    const [Contract,setContract]=useState({
        provider:null,
        signer:null,
        contract:null
    })
    const [Account,setAccount]=useState('')
    const [shouldRefresh,Refresh]=useState(false)
useEffect(()=>{
    let contractAdress='0xb59484Fc012d62E00036C779A9bd098c5F54f3ED';
    let contractAbi=abi.abi;

    const ConnectDapp=async()=>{
        try{
            const {ethereum}=window;
            const account =await ethereum.request({
                method:'eth_requestAccounts'
            });
            window.ethereum.on('accountsChanged',()=>{
                window.location.reload();
            });
            setAccount(account);      
            const provider=await new ethers.providers.Web3Provider(ethereum);
            const signer=await provider.getSigner();
            const contract= new ethers.Contract(
                contractAdress,
                contractAbi,
                signer
            )
            setContract({provider,signer,contract});
        }catch(e){
            console.log(e)
        }
    }
    ConnectDapp()
},[shouldRefresh])
return {Contract,Account,Refresh}
}
export default useContract;