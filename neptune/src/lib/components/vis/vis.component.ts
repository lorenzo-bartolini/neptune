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

  @Input()inputNodes: any[]|undefined = [];
  @Input()inputEdges: any = [];

  network: any;

  nodes = new vis.DataSet({});
  edges = new vis.DataSet({});
  /* nodes = new vis.DataSet([
    { id: 1, label: "Node 1" },
    { id: 2, label: "Node 2" },
    { id: 3, label: "Node 3" },
    { id: 4, label: "Node 4" },
    { id: 5, label: "Node 5" },
  ]); */

  // create an array with edges
  /*  edges = new vis.DataSet([
    { from: 1, to: 3 },
    { from: 1, to: 2 },
    { from: 2, to: 4 },
    { from: 2, to: 5 }
  ]); */

  constructor(private neptune: NeptuneService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.inputNodes &&
      changes.inputNodes.currentValue !==
        changes.inputNodes.previousValue
    ) {

      this.inputNodes = this.inputNodes!.map((node: any) => {
        return {
          id: node.id,
          label: node.label
        }
      })
      console.log('mapped',this.inputNodes)


      //removes duplicate by id
      this.inputNodes = this.inputNodes!.filter((v,i,a)=>a.findIndex(t=>(t.id===v.id))===i)

      console.log('no duplicates',this.inputNodes)
      this.nodes = new vis.DataSet(this.inputNodes)
      this.edges = new vis.DataSet(this.inputEdges)
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
      edges: {
        smooth: {
          forceDirection: 'none',
        },
      },
      physics: {
        enabled: false,
        minVelocity: 0.75,
      },
      nodes: {
        shape: 'box',
      },
      layout: {
        hierarchical: {
          direction: 'UD',
        },
      },
    };
    this.network = new vis.Network(container, data, options);
    this.network.on('click', (params: any) => {
      let fromnode = this.network.getNodeAt(params.pointer.DOM);
      let node = this.nodes.get(fromnode).value;
      console.log(fromnode);
      console.log(this.nodes.get(fromnode).value);
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
    });
  }
}
