import { PlanModel } from 'src/app/models';

export default [
    new PlanModel({
        name: 'Soho',
        id: 'soho',
        subTitle: 'Para 2 a 29 vidas',
        description: 'O SoHo é o plano para até 29 vidas, indicado para pequenas empresas, empresas que atuam com home office e operações mais enxutas.',
        linkId: 'soho'
    }),
    new PlanModel({
        name: 'Clube Care Plus',
        id: 'clubeCarePlus',
        subTitle: 'Para 30 a 200 vidas',
        description: 'O Clube Care Plus é o plano para empresas com até 200 vidas, indicado para empresas que estão crescendo e expandindo seu negócio',
        linkId: 'clube-careplus'
    }),
    new PlanModel({
        name: 'Empresarial',
        id: 'empresarial',
        subTitle: 'Para mais de 200 vidas',
        description: 'O Empresarial é o plano totalmente customizável da Care Plus, indicado para grandes empresas com mais de 200 vidas.',
        linkId: 'empresarial'
    })
]