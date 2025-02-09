import React, { createContext, useState, useMemo } from 'react';
import DataGrid from 'react-data-grid';
import 'react-data-grid/lib/styles.css';

export type FilterValue = string | number | boolean | undefined;

export interface Filter {
  enabled: boolean;
  [key: string]: FilterValue;
}

export interface FilterDefinition<R> {
  key: string;
  component: (props: FilterRendererProps<R>) => React.ReactElement;
  matcher: (row: R, filterValue: FilterValue) => boolean;
}

interface FilterRendererProps<R> {
  value: FilterValue;
  onChange: (value: FilterValue) => void;
  tabIndex: number;
  row?: R;
}

const FilterContext = createContext<Filter | undefined>(undefined);

export function TextFilter<R>({ value, onChange, tabIndex }: FilterRendererProps<R>) {
  return (
    <input
      tabIndex={tabIndex}
      className="w-full p-1 text-sm"
      value={value as string ?? ''}
      onChange={e => onChange(e.target.value)}
      onKeyDown={e => {
        if (['ArrowLeft', 'ArrowRight'].includes(e.key)) {
          e.stopPropagation();
        }
      }}
    />
  );
}

export function SelectFilter<R>({ 
  value, 
  onChange, 
  tabIndex,
  options 
}: FilterRendererProps<R> & { 
  options: { label: string; value: string }[] 
}) {
  return (
    <select
      tabIndex={tabIndex}
      className="w-full p-1 text-sm"
      value={value as string ?? ''}
      onChange={e => onChange(e.target.value)}
      onKeyDown={e => {
        if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
          e.stopPropagation();
        }
      }}
    >
      <option value="">All</option>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export const matchers = {
  text: (row: any, filterValue: FilterValue, key: string) => {
    if (!filterValue) return true;
    const cellValue = String(row[key]).toLowerCase();
    return cellValue.includes(String(filterValue).toLowerCase());
  },
  
  exact: (row: any, filterValue: FilterValue, key: string) => {
    if (!filterValue) return true;
    return String(row[key]) === String(filterValue);
  },
  
  number: (row: any, filterValue: FilterValue, key: string) => {
    if (!filterValue) return true;
    return Number(row[key]) === Number(filterValue);
  }
};

function FilterHeaderRenderer<R>({
  tabIndex,
  column,
  filterDefinition,
  filters,
  onFilterChange
}: {
  tabIndex: number;
  column: { name: string; key: string };
  filterDefinition: FilterDefinition<R>;
  filters: Filter;
  onFilterChange: (key: string, value: FilterValue) => void;
}) {
  const FilterComponent = filterDefinition.component;
  
  return (
    <>
      <div>{column.name}</div>
      {filters.enabled && (
        <div>
          <FilterComponent
            value={filters[column.key]}
            onChange={value => onFilterChange(column.key, value)}
            tabIndex={tabIndex}
          />
        </div>
      )}
    </>
  );
}

export interface FilterableGridProps<R> {
  columns: any[];
  rows: R[];
  filterDefinitions: FilterDefinition<R>[];
  defaultFilters?: { [key: string]: FilterValue };
}

export function FilterableGrid<R extends { [key: string]: any }>({ 
  columns: initialColumns,
  rows: initialRows,
  filterDefinitions,
  defaultFilters = {}
}: FilterableGridProps<R>) {

  const [filters, setFilters] = useState<Filter>(() => ({
    enabled: true,
    ...Object.fromEntries(
      filterDefinitions.map(def => [def.key, defaultFilters[def.key] ?? ''])
    )
  }));

  const onFilterChange = (key: string, value: FilterValue) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const columns = useMemo(() => {
    return initialColumns.map(col => {
      const filterDef = filterDefinitions.find(def => def.key === col.key);
      if (!filterDef) return col;

      return {
        ...col,
        headerCellClass: 'filter-cell',
        renderHeaderCell: (props: any) => (
          <FilterHeaderRenderer
            {...props}
            filterDefinition={filterDef}
            filters={filters}
            onFilterChange={onFilterChange}
          />
        )
      };
    });
  }, [initialColumns, filterDefinitions, filters]);

  const rows = useMemo(() => {
    if (!filters.enabled) return initialRows;
    
    return initialRows.filter(row => {
      return filterDefinitions.every(({ key, matcher }) => {
        const filterValue = filters[key];
        return matcher(row, filterValue);
      });
    });
  }, [initialRows, filters, filterDefinitions]);

  const toggleFilters = () => {
    setFilters(f => ({ ...f, enabled: !f.enabled }));
  };

  const clearFilters = () => {
    setFilters({
      enabled: true,
      ...Object.fromEntries(
        filterDefinitions.map(def => [def.key, defaultFilters[def.key] ?? ''])
      )
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="text-right space-x-2">
        <button 
          className="px-3 py-1 border rounded hover:bg-gray-100"
          onClick={toggleFilters}
        >
          Toggle Filters
        </button>
        <button
          className="px-3 py-1 border rounded hover:bg-gray-100"
          onClick={clearFilters}
        >
          Clear Filters
        </button>
      </div>
      
      <FilterContext.Provider value={filters}>
        <DataGrid
          className={filters.enabled ? 'filter-enabled' : undefined}
          columns={columns}
          rows={rows}
          headerRowHeight={filters.enabled ? 70 : undefined}
        />
      </FilterContext.Provider>

      <style>{`
        .filter-cell {
          line-height: 35px;
          padding: 0;
        }
        
        .filter-cell > div {
          padding: 0 8px;
        }
        
        .filter-cell > div:first-child {
          border-bottom: 1px solid var(--rdg-border-color);
        }
        
        .filter-enabled .rdg-header-row {
          height: 70px;
        }
      `}</style>
    </div>
  );
}