import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { NeptuneService } from 'src/app/services/neptune.service';
import { Product } from 'src/lib/interfaces/elements';

declare var vis: any;

@Component({
  selector: 'app-vis',
  templateUrl: './vis.component.html',
  styleUrls: ['./vis.component.scss'],
})
export class VisComponent implements OnInit, OnChanges {
  @ViewChild('networkContainer')
  networkContainer!: ElementRef;
  title = 'neptune';
  @Input()inputNodes: any[] = [];
  @Input()inputEdges: any = [];

  network: any;

  nodes = new vis.DataSet({});
  edges = new vis.DataSet({});

  clusters: any[] = []

  constructor(private neptune: NeptuneService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.inputNodes.currentValue)
    if (changes.inputNodes.currentValue !== changes.inputNodes.previousValue) {
      this.nodes = new vis.DataSet({});
      this.edges = new vis.DataSet({});
      //init fisrt cluster
      let newId = Math.random().toString().slice(2,9)
      this.clusters.push({
        id: newId,
        label: this.inputNodes[0].label + '\n' + this.inputNodes[0].nodes.length,
        value: this.inputNodes[0].nodes,
        type: 'cluster'
      })

      this.nodes = new vis.DataSet([{
        id: newId,
        label: this.inputNodes[0].label + '\n' + this.inputNodes[0].nodes.length,
        //value: this.inputNodes[0].nodes,
        type: 'cluster',
        color: 'orange'
      }])



      //removes duplicate by id
      //this.inputNodes = this.inputNodes!.filter((v,i,a)=>a.findIndex(t=>(t.id===v.id))===i)



      //this.nodes = new vis.DataSet(this.inputNodes)
      //this.edges = new vis.DataSet(this.inputEdges)
      this.initNetwork();


     /*  if (changes.inputNodes.previousValue) {
        this.nodes.remove({ id: changes.selectedProduct.previousValue.id });
      }

      this.nodes.add({
        id: this.selectedProduct?.id,
        label: this.selectedProduct?.product_name,
        type: this.selectedProduct?.label,
        value: this.selectedProduct,
      }); */
    }
  }

  initNetwork() {
    let container = this.networkContainer.nativeElement;
    let data = {
      nodes: this.nodes,
      edges: this.edges,
    };
    const options = {

      nodes: {
        shape: 'circle',
      }
    };

    this.network = new vis.Network(container, data, options);
    this.network.on('click', (params: any) => {
      let fromnode = this.nodes.get(this.network.getNodeAt(params.pointer.DOM)) ;
      let newId = ''
      let i = -1
      let edges: any[] = []
      let nodes: any[] = []
      console.log(fromnode);
      if(fromnode){
      switch (fromnode.type) {
        case 'cluster':
          let cluster = this.clusters.find(c=> c.id === fromnode.id)

          cluster.value.forEach((node:any) => {
            switch (node.label) {
              case 'product_ontology':
                i = this.inputNodes.findIndex(e => e.label === node.label)

                this.nodes.add({
                  id: node.id,
                  label: node.product_name[0],
                  type: node.label
                })
                break;
              case 'session_ontology':
                i = this.inputNodes.findIndex(e => e.label === node.label)

                this.nodes.add({
                  id: node.id,
                  label: node.id,
                  type: node.label
                })
                break;

                case 'user_ontology':
                i = this.inputNodes.findIndex(e => e.label === node.label)

                this.nodes.add({
                  id: node.id,
                  label: node.full_name[0],
                  type: node.label
                })
                break;
              default:
                break;
            }
            this.edges.add({
              from: fromnode.id,
              to: node.id
            })

           /*  let edge = this.inputEdges.find((e:any) => e.to === node.id)
            this.edges.add({
              from: edge.from,
              to: edge.to
            }) */
          });
          break;
        case 'product_ontology':
          //create anomaly cluster
          i = this.inputNodes.findIndex(e => e.label === fromnode.type)
          //search edges with ID of nodeClicked
          edges = this.inputEdges.filter((e:any) => e.from === fromnode.id || e.to === fromnode.id)
          //search nodes that correspond to that edges
          nodes = this.inputNodes[i+1].nodes.filter((n:any) => edges.some((e:any)=> e.from === n.id || e.to === n.id))

          let nodes2: any[] = []
          i = this.inputNodes.findIndex(e => e.label === 'user_ontology')
          nodes.forEach(sessionNode=>{
            edges = this.inputEdges.filter((e:any) => e.from === fromnode.id || e.to === sessionNode.id)
            let tempNodes = this.inputNodes[i].nodes.filter((n:any) => edges.some((e:any)=> e.from === n.id || e.to === n.id))
            nodes2.push.apply(nodes2, tempNodes)
          })

          //remove duplicates
          nodes2 = nodes2!.filter((v,i,a)=>a.findIndex(t=>(t.id===v.id))===i)

          newId = fromnode.id + 'c'
          //push cluster
          this.clusters.push({
            id: newId,
            label: this.inputNodes[i].label + '\n' + nodes2.length,
            value: nodes2,
            type: 'cluster'
          })

          this.nodes.add({
            id:newId,
            label: this.inputNodes[i].label + '\n' + nodes2.length,
            //value: nodes,
            type: 'cluster'
          })

          //add link to caller
          this.edges.add({
            from: fromnode.id,
            to: newId
          })
          break;
        default:
          i = this.inputNodes.findIndex(e => e.label === fromnode.type)
          //search edges with ID of nodeClicked
          edges = this.inputEdges.filter((e:any) => e.from === fromnode.id || e.to === fromnode.id)
          //search nodes that correspond to that edges
          nodes = this.inputNodes[i+1].nodes.filter((n:any) => edges.some((e:any)=> e.from === n.id || e.to === n.id))

          //remove duplicates
          nodes = nodes!.filter((v,i,a)=>a.findIndex(t=>(t.id===v.id))===i)

          newId = fromnode.id + 'c'
          //push cluster
          this.clusters.push({
            id: newId,
            label: this.inputNodes[i+1].label+ '\n' + nodes.length,
            value: nodes,
            type: 'cluster'
          })

          this.nodes.add({
            id:newId,
            label: this.inputNodes[i+1].label+ '\n' + nodes.length,
            //value: nodes,
            type: 'cluster'
          })

          //add link to caller
          this.edges.add({
            from: fromnode.id,
            to: newId
          })
          break;
      }
    }
      /* switch (node.label) {
        case 'product_ontology':
          this.neptune.getPurchasesFromProduct(node.id).subscribe((res) => {
            console.log(res);
          });
          break;

        case 'purchase_ontology':
          this.neptune.getUsersFromPurchase(node.id).subscribe((res) => {
            console.log(res);
          });
          break;
      } */

      console.log(this.nodes, this.edges);

    });
  }
}
