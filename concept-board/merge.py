import json,glob,os,sys
c=json.load(open('project/canvas.json',encoding='utf-8'))
for f in sorted(glob.glob('fragments/*.json')):
    d=json.load(open(f,encoding='utf-8'))
    c['boards'].update(d.get('boards',{}))
    for k in d.get('order',[]):
        if k not in c['order']: c['order'].append(k)
    c.setdefault('notes',{}).update(d.get('notes',{}))
missing=[k for k in c['boards'] if not os.path.exists('project/'+k)]
orphan=[os.path.basename(p) for p in glob.glob('project/*.dc.html') if os.path.basename(p) not in c['boards']]
json.dump(c,open('project/canvas.json','w',encoding='utf-8'),ensure_ascii=False,indent=1)
print(len(c['boards']),'boards; missing files:',missing,'; orphans:',orphan)
