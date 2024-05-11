import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTreeModule } from '@angular/material/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';

interface TreeNode {
  name: string;
  children?: TreeNode[];
}

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [CommonModule,  MatTreeModule,],
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {
  treeControl = new NestedTreeControl<TreeNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<TreeNode>();

  constructor() {
    this.dataSource.data = [
      {
        name: 'Node 1',
        children: [
          { name: 'Child 1' },
          { name: 'Child 2' }
        ]
      },
      {
        name: 'Node 2',
        children: [
          { name: 'Child 3' },
          {
            name: 'Node 3',
            children: [
              { name: 'Child 4' },
              { name: 'Child 5' }
            ]
          }
        ]
      }
    ];
  }

  hasChild(_: number, node: TreeNode) {
    return !!node.children && node.children.length > 0;
  }
}
