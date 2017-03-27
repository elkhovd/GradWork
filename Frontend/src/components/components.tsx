import * as React from "react";
import * as ReactDOM from "react-dom";
import * as I from '../interfaces/interfaces'
import * as K from '../constants/constants'
import {store} from '../reducers/reducers'
import * as T from '../thunk/functions'
import * as Styles from '../styles/styles'

export const ToMainMenuButton = () =>
    <button onClick = {()=>store.dispatch({type:K.SELECT_MENU, menu:K.MAIN_MENU})}>
    Back
    </button>

export const ImageToolLocal = (record:any) =>
    <div>
        <button onClick={()=>
            store.dispatch(T.POST_IMAGE_REMOTE(record))}>
            Push
        </button>
        <button onClick={()=>store.dispatch({imageType:K.LOCAL_IMAGE, type:K.REMOVE, name:record.name})}>
            Delete
        </button>
        <button onClick={()=>store.dispatch(T.EDIT_ON_LOCAL(record))}>
            Edit
        </button>

        <button onClick={()=>store.dispatch(T.GET_PRINTERS_INFO_FROM_LOCAL(record.name))}>
            Print
        </button>
    </div>

export const ImageToolRemote = (record:any) =>
    <div>
        <button onClick={()=>
            store.dispatch(T.POST_IMAGE_REMOTE(record))}>
            Pull
        </button>
        <button onClick={()=>store.dispatch(T.REMOVE_IMAGE_REMOTE(record))}>
            Delete
        </button>

        <button onClick={()=>store.dispatch(T.GET_PRINTERS_INFO_FROM_LOCAL(record.name))}>
            Print
        </button>
    </div>


export const MainMenu = () =>
    <div>
        <h2><p>Main menu</p></h2>
        
        <button onClick = {()=>
                store.dispatch({type:K.SELECT_MENU, menu:K.IMAGE_REMOTE_MENU})}>
        Image Records Remote Menu
        </button>

        <button onClick = {()=>
                store.dispatch({type:K.SELECT_MENU, menu:K.IMAGE_LOCAL_MENU})}>
        Image Records Local Menu
        </button>
    </div>

export const ImageRemoteMenu = (images:any[], printers:any[], ImageToPrint:string, pickedPrinter:number) => 
    <div>
        <h2><p>Image Remote Menu</p></h2>
        <ToMainMenuButton/>

        <button onClick = {() => 
        store.dispatch(T.GET_IMAGE_RECORDS_REMOTE())}>
        Update from Remote
        </button>
            
        <br/>
        {images.map(r=>
            <div key={r.name}>
                <img src = {r.data}/>
                {ImageToolRemote(r)}
                {ImageToPrint == r.name? 
                <div style = {Styles.backdropStyle}>
                    {PrintPanel(r, printers, pickedPrinter)} </div> : ''}
            </div>
        )}
    </div>

//TODO Imagepanels should be united
export const ImageLocalMenu = (images:any[], printers:any[], ImageToPrint:string, pickedPrinter:number) => 
    <div>
        <h2><p>Image Local Menu</p></h2>
        <ToMainMenuButton/>

        
        <button onClick = {() => 
        store.dispatch(T.GET_IMAGE_RECORDS_LOCAL())}>
        Update from local
        </button>
            
        <br/>
        {images.map(r=>
            <div key={r.name}>
                <img src = {r.data}/>
                {ImageToolLocal(r)}
                {ImageToPrint == r.name? 
                <div style = {Styles.backdropStyle}>
                    {PrintPanel(r, printers, pickedPrinter)} </div> : ''}
            </div>
        )}
    </div>

export const modalWindow = (mes:string) => 
    <div style={Styles.backdropStyle}>
        <div style = {Styles.modalStyle}>
        <h1>{mes}</h1>
        <br/>
        <button onClick = {() => store.dispatch({type:K.PRINTING_CHANGE_STATUS, status:K.PRINTING_NOTHING})}>
        Ok
        </button>
        </div>
    </div>

export const PrintPanel = (imageToPrint:I.Image, printers:any[], picked:any) => 
    <div style = {Styles.modalStyle}>
        <h2><p>Printing {imageToPrint.name} file</p></h2>
 
        
        <select onChange = {e=>store.dispatch({
            type:K.PRINTING_PICK_PRINTER,
            picked:e.target.selectedIndex
        })}>
            {printers.map(m=><option key = {m.name}>{m.name}</option>)}
        </select>

        {Object.keys(printers[picked]).map(m=> 
            <h3 key = {m}><p>{m.toString() + ' : ' + (printers[picked] as any)[m]}</p></h3>)}
        
        <br/>
        <button onClick = {()=>store.dispatch({type:K.PRINTING_CHANGE_STATUS, status:K.PRINTING_NOTHING})}>
            Back
        </button>

        <button onClick = {()=>{store.dispatch(T.PRINT_IMAGE({printer:printers[picked], image:imageToPrint}))}}>
        Print
        </button>
        <br/>      
    </div>
