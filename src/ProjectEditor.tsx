import { useRef, useState, type Dispatch, type SetStateAction } from 'react';
import { ArrowUpRight, ArrowUp, ArrowDown, Plus, Trash2, X, Upload, Download, Copy, RotateCcw, ImagePlus } from 'lucide-react';
import type { Project } from './App';
import './editor.css';

type Props = { projects: Project[]; setProjects: Dispatch<SetStateAction<Project[]>>; onClose: () => void; onReset: () => void; saveFailed: boolean };
const categories: Project['category'][] = ['Web','Sistemas','Automatización','Backend'];
const visuals: Project['visual'][] = ['sushi','amargos','coop','teros','contable','turnero'];
const github = 'https://github.com/pedrochiozza5/portfolio/edit/main/src/content/projects.json';
const safeUrl = (v: string) => { try { return ['https:','http:'].includes(new URL(v).protocol); } catch { return false; } };
const safeImage = (v: string) => safeUrl(v) || /^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/.test(v) || /^images\/projects\/[A-Za-z0-9._/-]+$/.test(v);
function normalize(payload: unknown): Project[] {
  const list = Array.isArray(payload) ? payload : (payload && typeof payload === 'object' && 'projects' in payload ? (payload as {projects: unknown}).projects : null);
  if (!Array.isArray(list) || list.length > 40) throw new Error('JSON incorrecto: máximo 40 proyectos.');
  const result = list.map((entry,index):Project => {
    if (!entry || typeof entry !== 'object') throw new Error('Proyecto incorrecto.');
    const x = entry as Record<string, unknown>;
    const str = (key:string,limit=2000) => typeof x[key]==='string' ? (x[key] as string).slice(0,limit) : '';
    const cover = str('cover',1400000);
    return {
      id:str('id',100)||'proyecto-'+index, number:String(index+1).padStart(2,'0'), name:str('name',150),
      tagline:str('tagline',350), category:categories.includes(x.category as Project['category']) ? x.category as Project['category'] : 'Sistemas',
      kind:str('kind',130),status:str('status',130), description:str('description'),problem:str('problem'),
      solution:str('solution'),result:str('result'),stack:Array.isArray(x.stack)?x.stack.filter((s):s is string=>typeof s==='string').slice(0,12):[],
      visual:visuals.includes(x.visual as Project['visual'])?x.visual as Project['visual']:'contable',
      cover:safeImage(cover)?cover:'',url:safeUrl(str('url',500))?str('url',500):'',urlLabel:str('urlLabel',100)
    };
  });
  if (new Set(result.map(x=>x.id)).size!==result.length) throw new Error('Hay identificadores duplicados.');
  return result;
}
function Input({label,value,onChange,large=false}:{label:string;value:string;onChange:(v:string)=>void;large?:boolean}) {
  return <label className="ed-field"><span>{label}</span>{large?<textarea rows={3} value={value} onChange={e=>onChange(e.target.value)}/>:<input value={value} onChange={e=>onChange(e.target.value)}/>}</label>;
}
async function fileToImage(file:File):Promise<string> {
  if(!['image/png','image/jpeg','image/webp'].includes(file.type)) throw new Error('Usá JPG, PNG o WEBP.');
  if(file.size>10000000) throw new Error('Elegí una imagen de menos de 10 MB.');
  const url=URL.createObjectURL(file);
  try{
    const img=new Image();img.src=url;
    await new Promise<void>((resolve,reject)=>{img.onload=()=>resolve();img.onerror=()=>reject(new Error('No se pudo leer la foto.'));});
    const factor=Math.min(1,1400/img.naturalWidth,1000/img.naturalHeight);
    const canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(img.naturalWidth*factor));canvas.height=Math.max(1,Math.round(img.naturalHeight*factor));
    const ctx=canvas.getContext('2d');if(!ctx)throw new Error('Error al comprimir la foto.');
    ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(img,0,0,canvas.width,canvas.height);
    const result=canvas.toDataURL('image/jpeg',.76);
    if(result.length>1350000)throw new Error('La foto sigue siendo muy pesada. Elegí una más liviana.');
    return result;
  }finally{URL.revokeObjectURL(url);}
}
export default function ProjectEditor({projects,setProjects,onClose,onReset,saveFailed}:Props){
  const [selectedId,setSelectedId]=useState(projects[0]?.id??'');
  const [tab,setTab]=useState<'edit'|'publish'>('edit');
  const [message,setMessage]=useState('');
  const [busy,setBusy]=useState(false);
  const photo=useRef<HTMLInputElement>(null),jsonFile=useRef<HTMLInputElement>(null);
  const selected=projects.find(p=>p.id===selectedId)??projects[0];
  const edit=(data:Partial<Project>)=>{if(selected)setProjects(old=>old.map(p=>p.id===selected.id?{...p,...data}:p));};
  const add=()=>{
    if(projects.length>=40){setMessage('Máximo 40 proyectos.');return;}
    const item:Project={id:'nuevo-'+Date.now(),number:String(projects.length+1).padStart(2,'0'),name:'Nuevo proyecto',tagline:'',category:'Sistemas',kind:'SOFTWARE A MEDIDA',status:'EN DESARROLLO',description:'',problem:'',solution:'',result:'',stack:[],visual:'contable',cover:'',url:'',urlLabel:''};
    setProjects(p=>[...p,item]);setSelectedId(item.id);setTab('edit');
  };
  const reorder=(step:number)=>{
    if(!selected)return;const idx=projects.findIndex(p=>p.id===selected.id),n=idx+step;
    if(n<0||n>=projects.length)return;const next=[...projects];[next[idx],next[n]]=[next[n],next[idx]];
    setProjects(next.map((p,i)=>({...p,number:String(i+1).padStart(2,'0')})));
  };
  const remove=()=>{
    if(!selected||!window.confirm('¿Eliminar '+selected.name+' del borrador?'))return;
    const rest=projects.filter(p=>p.id!==selected.id).map((p,i)=>({...p,number:String(i+1).padStart(2,'0')}));
    setProjects(rest);setSelectedId(rest[0]?.id??'');
  };
  const upload=async(file?:File)=>{
    if(!file)return;setBusy(true);try{edit({cover:await fileToImage(file)});setMessage('Foto optimizada y guardada en este dispositivo.');}
    catch(e){setMessage(e instanceof Error?e.message:'Error de imagen.');}
    finally{setBusy(false);if(photo.current)photo.current.value='';}
  };
  const data=()=>JSON.stringify(normalize(projects),null,2)+'\n';
  const download=()=>{
    const url=URL.createObjectURL(new Blob([data()],{type:'application/json'}));
    const a=document.createElement('a');a.href=url;a.download='projects.json';document.body.appendChild(a);a.click();a.remove();
    window.setTimeout(()=>URL.revokeObjectURL(url),1000);setMessage('JSON descargado. Publicalo reemplazando el archivo en GitHub.');
  };
  const copy=async()=>{
    try{await navigator.clipboard.writeText(data());setMessage('JSON copiado: pegalo en el archivo de GitHub y confirmá el commit.');}
    catch{setMessage('No se pudo copiar. Descargá el JSON.');}
  };
  const importData=async(file?:File)=>{
    if(!file)return;try{
      if(file.size>25000000)throw new Error('El archivo supera 25 MB.');
      const items=normalize(JSON.parse(await file.text()));
      if(!window.confirm('¿Importar '+items.length+' proyectos y reemplazar el borrador?'))return;
      setProjects(items);setSelectedId(items[0]?.id??'');setTab('edit');setMessage('JSON importado. Falta publicarlo en GitHub.');
    }catch(e){setMessage(e instanceof Error?e.message:'Error al importar.');}
    finally{if(jsonFile.current)jsonFile.current.value='';}
  };
  return <div className="ed-overlay" onMouseDown={e=>{if(e.target===e.currentTarget)onClose();}}><section className="ed-panel" role="dialog" aria-modal="true" aria-label="Editor de portfolio">
    <header className="ed-head"><div><img src={import.meta.env.BASE_URL+'logo-cztecno.svg'} alt="Logo CZ TECNO"/><span><small>CZ TECNO / CONTENT STUDIO</small><strong>Editor de proyectos</strong></span></div><button onClick={onClose} aria-label="Cerrar"><X size={22}/></button></header>
    <div className="ed-info"><b>{saveFailed?'Sin espacio para guardar':'Borrador local'}</b> · {saveFailed?'Descargá el JSON para conservar el trabajo.':'Los cambios se guardan solo en este navegador. Para publicarlos, usá GitHub.'}</div>
    <div className="ed-tabs"><button className={tab==='edit'?'active':''} onClick={()=>setTab('edit')}>Editar proyectos ({projects.length})</button><button className={tab==='publish'?'active':''} onClick={()=>setTab('publish')}>Publicar</button></div>
    {tab==='edit'?<div className="ed-layout"><aside className="ed-sidebar"><header>PROYECTOS <button onClick={add} aria-label="Nuevo proyecto"><Plus size={17}/></button></header><div className="ed-menu">{projects.map(p=><button className={selected?.id===p.id?'selected':''} key={p.id} onClick={()=>setSelectedId(p.id)}><small>{p.number}</small><span>{p.name}<em>{p.category}</em></span></button>)}</div><button className="ed-add" onClick={add}><Plus size={16}/> Agregar proyecto</button></aside>
      <div className="ed-scroll">{selected?<div className="ed-form"><div className="ed-tools"><small>EDITANDO / {selected.number}</small><span><button onClick={()=>reorder(-1)} aria-label="Subir"><ArrowUp size={16}/></button><button onClick={()=>reorder(1)} aria-label="Bajar"><ArrowDown size={16}/></button><button onClick={remove} aria-label="Borrar"><Trash2 size={16}/></button></span></div>
        <div className="ed-preview">{selected.cover&&safeImage(selected.cover)?<img src={selected.cover.startsWith('images/')?import.meta.env.BASE_URL+selected.cover:selected.cover} alt={selected.name}/>:<div><ImagePlus size={30}/> Ilustración original (sin foto)</div>}</div>
        <div className="ed-photo"><input type="file" hidden ref={photo} accept="image/jpeg,image/png,image/webp" onChange={e=>void upload(e.target.files?.[0])}/><button disabled={busy} onClick={()=>photo.current?.click()}><Upload size={17}/>{busy?'Comprimiendo...':'Subir imagen'}</button>{selected.cover&&<button onClick={()=>edit({cover:''})}>Quitar imagen</button>}</div><p className="ed-hint">JPG/PNG/WEBP optimizado automáticamente. Evitá datos privados en las capturas.</p>
        <Input label="URL de la imagen (opcional)" value={selected.cover?.startsWith('data:')?'':selected.cover??''} onChange={cover=>edit({cover})}/>
        <div className="ed-grid"><Input label="Nombre" value={selected.name} onChange={name=>edit({name})}/><Input label="Estado" value={selected.status} onChange={status=>edit({status})}/></div>
        <Input label="Frase principal" value={selected.tagline} onChange={tagline=>edit({tagline})}/><Input label="Tipo de proyecto" value={selected.kind} onChange={kind=>edit({kind})}/>
        <div className="ed-grid"><label className="ed-field"><span>Categoría</span><select value={selected.category} onChange={e=>edit({category:e.target.value as Project['category']})}>{categories.map(x=><option key={x}>{x}</option>)}</select></label><label className="ed-field"><span>Ilustración sin imagen</span><select value={selected.visual} onChange={e=>edit({visual:e.target.value as Project['visual']})}>{visuals.map(x=><option key={x}>{x}</option>)}</select></label></div>
        <Input label="Descripción" value={selected.description} onChange={description=>edit({description})} large/><Input label="Problema" value={selected.problem} onChange={problem=>edit({problem})} large/><Input label="Solución" value={selected.solution} onChange={solution=>edit({solution})} large/><Input label="Resultado" value={selected.result} onChange={result=>edit({result})} large/>
        <Input label="Tecnologías (separadas por coma)" value={selected.stack.join(', ')} onChange={v=>edit({stack:v.split(',').map(x=>x.trim()).filter(Boolean)})}/><div className="ed-grid"><Input label="Enlace del proyecto" value={selected.url??''} onChange={url=>edit({url})}/><Input label="Nombre del botón" value={selected.urlLabel??''} onChange={urlLabel=>edit({urlLabel})}/></div>
      </div>:<p>Agregá tu primer proyecto.</p>}</div></div>:
      <div className="ed-publish"><h3>De borrador a publicación</h3><p>El portfolio está en GitHub Pages. No se usan ni se guardan contraseñas o tokens. Los cambios solo se vuelven públicos al confirmar un commit.</p><ol><li><b>Revisá tus proyectos.</b><span>El sitio muestra la vista previa en este dispositivo.</span></li><li><b>Copiá o descargá el JSON.</b><span>Incluye textos, enlaces e imágenes optimizadas.</span></li><li><b>Reemplazá src/content/projects.json.</b><span>Entrá a GitHub, pegá el JSON y elegí Commit changes. La web se actualiza con el despliegue automático.</span></li></ol><div className="ed-pub-actions"><button onClick={()=>void copy()}><Copy size={17}/> Copiar JSON</button><button onClick={download}><Download size={17}/> Descargar JSON</button><a href={github} target="_blank" rel="noreferrer">Abrir archivo en GitHub <ArrowUpRight size={17}/></a></div><hr/><input ref={jsonFile} type="file" accept="application/json,.json" hidden onChange={e=>void importData(e.target.files?.[0])}/><div className="ed-second"><button onClick={()=>jsonFile.current?.click()}><Upload size={17}/> Importar JSON</button><button onClick={()=>{if(window.confirm('¿Descartar el borrador y recuperar la versión publicada?')){onReset();setMessage('Versión publicada restaurada.');}}}><RotateCcw size={17}/> Restaurar publicada</button></div><p><small>No publiques credenciales, datos internos ni imágenes privadas.</small></p></div>}
    <footer className="ed-foot"><span role="status">{message||'Vista previa local · sin credenciales'}</span><button onClick={onClose}>Ver portfolio <ArrowUpRight size={16}/></button></footer>
  </section></div>;
}